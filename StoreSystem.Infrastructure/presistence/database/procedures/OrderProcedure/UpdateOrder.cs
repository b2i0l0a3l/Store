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
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.procedures
{
    public class UpdateOrder : IUpdateOrderProcedure
    {
        private readonly AppDbContext _Context;
        public UpdateOrder(AppDbContext context) => _Context = context;

        public async Task<Result> Handle(UpdateOrderModel req)
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            using var transaction = await _Context.Database.BeginTransactionAsync();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_order_id", req.OrderId);
                parameters.Add("p_client_id", req.ClientId );
                parameters.Add("p_order_type",(int) req.OrderType);
                parameters.Add("p_order_status",(int) req.OrderStatus);

                var result = await connection.ExecuteAsync("CALL sp_update_order(@p_order_id,@p_client_id,@p_order_type,@p_order_status)",
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