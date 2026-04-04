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
using StoreSystem.Core.Models.DashboardModels;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.OrderFunctions
{
    public class FnSalesOverTimeFunction : IFnSalesOverTimeFunction
    {
        private readonly AppDbContext _context;

        public FnSalesOverTimeFunction(AppDbContext context) => _context = context;

        public async Task<Result<IEnumerable<SalesOverTimeModel>>> Handle(int days)
        {
            var connection = _context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();

            try
            {
                var result = await connection.QueryAsync<SalesOverTimeModel>("select * from fn_sales_over_time(@Days)", new { Days = days });
                var list = result.ToList();
                if (list == null || list.Count == 0) return Errors.DataNotFoundError;
                return list;
            }
            catch
            {
                return new Error("GetSalesOverTimeERROR", StoreSystem.Core.enums.ErrorType.Failure, "A database error occurred.");
            }
        }
    }
}
