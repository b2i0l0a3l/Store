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
    public class FnLowStockAlertsFunction : IFnLowStockAlertsFunction
    {
        private readonly AppDbContext _context;

        public FnLowStockAlertsFunction(AppDbContext context) => _context = context;

        public async Task<Result<IEnumerable<LowStockProductModel>>> Handle()
        {
            var connection = _context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();

            try
            {
                var result = await connection.QueryAsync<LowStockProductModel>("select * from fn_low_stock_alerts()");
                var list = result.ToList();
                if (list == null || list.Count == 0) return Errors.DataNotFoundError;
                return list;
            }
            catch
            {
                return new Error("GetLowStockAlertsERROR", StoreSystem.Core.enums.ErrorType.Failure, "A database error occurred.");
            }
        }
    }
}
