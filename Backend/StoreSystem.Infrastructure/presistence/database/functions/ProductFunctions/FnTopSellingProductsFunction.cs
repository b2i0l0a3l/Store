using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces.functions.ProductFunctions;
using StoreSystem.Core.Models.DashboardModels;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.ProductFunctions
{
    public class FnTopSellingProductsFunction : IFnTopSellingProductsFunction
    {
        private readonly AppDbContext _context;

        public FnTopSellingProductsFunction(AppDbContext context) => _context = context;

        public async Task<Result<IEnumerable<TopSellingProductModel>>> Handle()
        {
            var connection = _context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();

            try
            {
                var result = await connection.QueryAsync<TopSellingProductModel>("select * from fn_top_selling_products()");
                var list = result.ToList();
                if (list == null || list.Count == 0) return Errors.DataNotFoundError;
                return list;
            }
            catch (Exception ex)
            {
                return new Error("GetTopSellingProductsERROR", ErrorType.General, ex.Message);
            }
        }
    }
}
