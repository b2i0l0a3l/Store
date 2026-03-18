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
using StoreSystem.Core.Models.OrderItemModels;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.OrderItemFunctions
{
    public class GetOrderItemPagination : IGetOrderItemPagination
    {
        private readonly AppDbContext _Context;
        public GetOrderItemPagination(AppDbContext context) => _Context = context;
        public async Task<Result<PagedResult<OrderItemWithTotalCount>>> handle(int PageNumber, int PageSize)
        {
             var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_page_number", PageNumber);
                parameters.Add("p_page_size", PageSize);

                var result = await connection.QueryAsync<OrderItemWithTotalCount>("select * from fn_get_order_item_paginated(@p_page_size,@p_page_number)",
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
            catch (Exception ex)
            {
                return new Error("GetOrderItemERROR", ErrorType.General, ex.Message);
            }
        }
    }
}