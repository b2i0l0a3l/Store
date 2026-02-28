using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions
{
    public class GetProducts : IGetProductsFucntion
    {
        private readonly AppDbContext _Context;
        public GetProducts(AppDbContext context) => _Context = context;
        public async Task<Result<PagedResult<ProductsModel>>> GetProductsAsync(int PageNumber, int PageSize)
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_page_number", PageNumber);
                parameters.Add("p_page_size", PageSize);

                var result = await connection.QueryAsync<ProductsModel>("select * from fn_get_all_product_paged(@p_page_number,@p_page_size)",
                    parameters
                );
                var list = result.ToList();
                if (list.Count == 0) return Errors.DataNotFoundError;
                PagedResult<ProductsModel> pagedResult = new ()
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