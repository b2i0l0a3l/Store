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
    public class FnRecentOrdersFunction : IFnRecentOrdersFunction
    {
        private readonly AppDbContext _context;

        public FnRecentOrdersFunction(AppDbContext context) => _context = context;

        public async Task<Result<IEnumerable<RecentOrderModel>>> Handle()
        {
            var connection = _context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();

            try
            {
                var result = await connection.QueryAsync<RecentOrderModel>("select * from fn_recent_orders()");
                var list = result.ToList();
                if (list == null || list.Count == 0) return Errors.DataNotFoundError;
                return list;
            }
            catch (Exception ex)
            {
                return new Error("GetRecentOrdersERROR", ErrorType.General, ex.Message);
            }
        }
    }
}
