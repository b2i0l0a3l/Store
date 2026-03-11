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

namespace StoreSystem.Infrastructure.presistence.database.functions.ProductFunctions
{
    public class SearchProductFunction : ISearchProduct
    {
        private readonly AppDbContext _Context;
        public SearchProductFunction(AppDbContext context) => _Context = context;
        public async Task<Result<PagedResult<ProductsModel>>> Handle(string? ProductName, int? CategoryId, int PageNumber, int PageSize)
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("p_page_number", PageNumber);
                parameters.Add("p_page_size", PageSize);
                parameters.Add("p_category_id", CategoryId ?? null);
                parameters.Add("p_name", ProductName ?? null);

                var result = await connection.QueryAsync<ProductsModel>("select * from fn_search_for_product_by_name(@p_name,@p_category_id,@p_page_size,@p_page_number)",
                    parameters
                );
                var list = result.ToList();
                if (list.Count == 0) return Errors.DataNotFoundError;
                PagedResult<ProductsModel> pagedResult = new()
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
                return new Error("GetProductsERROR", ErrorType.General, ex.Message);
            }
        } 
    }
}