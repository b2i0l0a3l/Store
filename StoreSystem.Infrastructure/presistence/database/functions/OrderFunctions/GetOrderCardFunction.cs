using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.OrderFunctions
{
    public class GetOrderCardFunction : IGetOrderCardFunction
    {
        private readonly AppDbContext _Context;
        public GetOrderCardFunction(AppDbContext context) => _Context = context;

        public async  Task<Result<OrderCardModel>> GetResultAsync(int OrderId)
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_order_id", OrderId);

                var result = await connection.QueryAsync<OrderCardModel>("select * from fn_get_client_order_card(@p_order_id)",
                    parameters
                );
                if (result == null) return Errors.DataNotFoundError;
                return (Result<OrderCardModel>)result;
            }
            catch (Exception ex)
            {
                return new Error("GetOrderItemERROR", ErrorType.General, ex.Message);
            }
        }
    }
}