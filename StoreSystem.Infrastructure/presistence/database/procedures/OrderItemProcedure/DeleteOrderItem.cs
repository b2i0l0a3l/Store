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
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.procedures
{
    public class DeleteOrderItem : IDeleteOrderItemProcedure
    {
        private readonly AppDbContext _Context;
        public DeleteOrderItem(AppDbContext context) => _Context = context;
        public async Task<Result> Handle(int OrderItemId)
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            using var transaction = await _Context.Database.BeginTransactionAsync();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_order_item_id", OrderItemId);

                var result = await connection.ExecuteAsync("CALL sp_delete_order_item_by_id(@p_order_item_id)",
                    parameters,
                    transaction: transaction.GetDbTransaction()
                );
                await transaction.CommitAsync();
                return Result.Success();
            }
            catch (Exception ex)
            {
                await _Context.Database.RollbackTransactionAsync();
                return new Error("DeleteOrderWithHisItemERROR", ErrorType.General, ex.Message);
            }
        }
    }
}