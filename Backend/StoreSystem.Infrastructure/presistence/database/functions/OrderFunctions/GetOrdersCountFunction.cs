using System;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces.functions.OrderFunctions;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.OrderFunctions
{
    public class GetOrdersCountFunction : IGetOrdersCountFunction
    {
        private readonly AppDbContext _context;

        public GetOrdersCountFunction(AppDbContext context) => _context = context;

        public async Task<Result<int>> Handle()
        {
            var connection = _context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();

            try
            {
                var count = await connection.QueryFirstOrDefaultAsync<int>("select COALESCE(count(o.\"Id\"), 0) from \"Orders\" o");
                return count;
            }
            catch
            {
                return new Error("GetOrdersCountERROR", StoreSystem.Core.enums.ErrorType.Failure, "A database error occurred.");
            }
        }
    }
}
