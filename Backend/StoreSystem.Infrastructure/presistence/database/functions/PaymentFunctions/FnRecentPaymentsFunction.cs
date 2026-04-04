using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces.functions.PaymentFunctions;
using StoreSystem.Core.Models.DashboardModels;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.PaymentFunctions
{
    public class FnRecentPaymentsFunction : IFnRecentPaymentsFunction
    {
        private readonly AppDbContext _context;

        public FnRecentPaymentsFunction(AppDbContext context) => _context = context;

        public async Task<Result<IEnumerable<RecentPaymentModel>>> Handle()
        {
            var connection = _context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();

            try
            {
                var result = await connection.QueryAsync<RecentPaymentModel>("select * from fn_recent_payments()");
                var list = result.ToList();
                if (list == null || list.Count == 0) return Errors.DataNotFoundError;
                return list;
            }
            catch
            {
                return new Error("GetRecentPaymentsERROR", StoreSystem.Core.enums.ErrorType.Failure, "A database error occurred.");
            }
        }
    }
}
