using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using StoreSystem.Infrastructure.HELPER;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.procedures
{
    public class HandleReturn : IHandleReturnProcedure
    {
        private readonly AppDbContext _Context;
        public HandleReturn(AppDbContext context)
        {
            _Context = context;
        }
        public async Task<Result> handle(ReturnWithItemModel returnWithItem)
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            using var transaction = await _Context.Database.BeginTransactionAsync();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_order_id", (int)returnWithItem.OrderId);

                parameters.AddJsonb(
                    "p_items",
                    returnWithItem.Items
                );

                var result = await connection.ExecuteAsync("CALL sp_return_items(@p_order_id, @p_items)",
                     parameters,
                    transaction: transaction.GetDbTransaction()
                );
                await transaction.CommitAsync();
                return Result.Success();
            }catch(Exception ex)
            {
                await _Context.Database.RollbackTransactionAsync();
                return new Error("OrderWithHisItemERROR", ErrorType.General, ex.Message);
                
            }

        }
    }
}