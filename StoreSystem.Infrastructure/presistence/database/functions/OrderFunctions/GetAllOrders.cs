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
using StoreSystem.Core.Models;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.OrderFunctions
{
    public class GetAllOrders : IGetAllOrdersFunction
    {
        private readonly AppDbContext _Context;
        public GetAllOrders(AppDbContext context) => _Context = context;

        public async Task<Result<IEnumerable<OrderCardModel>>> Handle()
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            try
            {
                var result = await connection.QueryAsync<OrderCardModel>("select * from fn_get_all_order()");
                List<OrderCardModel> orders = result.ToList();
                if (orders == null || orders.Count <= 0) return Errors.DataNotFoundError;
                return orders;
            }
            catch (Exception ex)
            {
                return new Error("GetOrderItemERROR", ErrorType.General, ex.Message);
            }
        }
    }
}