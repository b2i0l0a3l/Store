using Dapper;
using System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using StoreSystem.Infrastructure.Persistence;
using StoreSystem.Infrastructure.HELPER;

namespace StoreSystem.Infrastructure.presistence.database.procedures
{
    public class HandleOrderWithHisItems : IHandleOrderWithHisItemsProcedure
    {
        private readonly AppDbContext _Context;
        public HandleOrderWithHisItems(AppDbContext context)
        {
            _Context = context;
        }
        public async Task<Result> handle(OrderWithItemModel orderWithItem)
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            using var transaction = await _Context.Database.BeginTransactionAsync();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("client_id", orderWithItem.Client_Id);
                parameters.Add("order_type", (int)orderWithItem.OrderType);

                parameters.AddJsonb(
                    "items",
                    orderWithItem.Items
                );

                var result = await connection.ExecuteAsync("CALL sp_create_order_with_items(@client_id, @order_type, @items)",
                     parameters,
                    transaction: transaction.GetDbTransaction()
                );
                await transaction.CommitAsync();
                return Result.Success();
            }catch(Exception ex)
            {
                await _Context.Database.RollbackTransactionAsync();
                return new Error("AddOrderWithHisItemERROR", ErrorType.General, ex.Message);
                
            }

        }
    }
}