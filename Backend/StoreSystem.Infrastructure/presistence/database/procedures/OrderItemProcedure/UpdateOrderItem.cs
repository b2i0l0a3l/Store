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
    public class UpdateOrderItem : IUpdateOrderItemProcedure
    {
        private readonly AppDbContext _Context;
        public UpdateOrderItem(AppDbContext context) => _Context = context;
        public async Task<Result> handle(UpdateOrderItemModel req)
        {
             var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            using var transaction = await _Context.Database.BeginTransactionAsync();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_order_item_id", req.OrderItemId);
                parameters.Add("p_quantity", req.Quantity);
                parameters.Add("p_order_id", req.OrderId);
                parameters.Add("p_price", req.Price);
                parameters.Add("p_product_id", req.ProductId);

                var result = await connection.ExecuteAsync("CALL sp_update_order_item(@p_order_item_id, @p_quantity, @p_order_id,@p_price,@p_product_id)",
                    parameters,
                    transaction: transaction.GetDbTransaction()
                );
                await transaction.CommitAsync();
                return Result.Success();
            }
            catch (Exception ex)
            {
                await _Context.Database.RollbackTransactionAsync();
                return new Error("UpdateOrderWithHisItemERROR", ErrorType.General, ex.Message);
            }
        }
    }
}