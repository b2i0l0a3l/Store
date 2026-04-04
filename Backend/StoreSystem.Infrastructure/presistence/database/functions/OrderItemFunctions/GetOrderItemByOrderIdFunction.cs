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

namespace StoreSystem.Infrastructure.presistence.database.functions.OrderItemFunctions
{
    public class GetOrderItemByOrderIdFunction : IGetOrderItemPaginationFunction
    {
        private readonly AppDbContext _Context;
        public GetOrderItemByOrderIdFunction(AppDbContext context) => _Context = context;

        public async Task<Result<PagedResult<OrderItemWithTotalCount>>> GetOrderItemByOrderIdAsync(int PageNumber, int PageSize, int OrderId)
        {
             var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_page_number", PageNumber);
                parameters.Add("p_page_size", PageSize);
                parameters.Add("p_order_id", OrderId);

                var result = await connection.QueryAsync<OrderItemWithTotalCount>("select * from fn_get_all_order_items_paged(@p_page_number,@p_page_size,@p_order_id)",
                    parameters
                );
                var list = result.ToList();
                if (list.Count == 0) return Errors.DataNotFoundError;
                PagedResult<OrderItemWithTotalCount> pagedResult = new ()
                {
                    Items = list,
                    TotalItems = list.Count,
                    PageNumber = PageNumber,
                    PageSize = PageSize,
                    TotalCount = list.FirstOrDefault()?.TotalCount ?? 0
                };
                return pagedResult;
            }
            catch
            {
                return new Error("GetOrderItemERROR", StoreSystem.Core.enums.ErrorType.Failure, "A database error occurred.");
            }
        }
    }
}