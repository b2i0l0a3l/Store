using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces.functions.OrderFunctions;
using StoreSystem.Core.Models.OrderItemModels;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.OrderFunctions
{
    public class GetOrderItemByOrderId : IGetOrderItemsByOrderIdFunc
    {
        private readonly AppDbContext _Context;
        public GetOrderItemByOrderId(AppDbContext context) => _Context = context;

        public async Task<Result<IEnumerable<GetOrderItemByOrderIdModel>>> GetResultAsync(int OrderId)
        {
             var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_order_id", OrderId);

                var result = await connection.QueryAsync<GetOrderItemByOrderIdModel>("select * from fn_get_all_order_item_by_order_id(@p_order_id)",
                    parameters
                );
                var list = result.ToList();
                if (list.Count == 0) return Errors.DataNotFoundError;

                return list;
            }
            catch (Exception ex)
            {
                return new Error("GetOrderItemByOrderIdERROR", ErrorType.General, ex.Message);
            }
        }
      
    }
}