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
    public class GetTotalOrdersFunction : IGetTotalOrdersFunction
    {
        private readonly AppDbContext _context;

        public GetTotalOrdersFunction(AppDbContext context) => _context = context;

        public async Task<Result<decimal>> Handle()
        {
            var connection = _context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();

            try
            {
                var total = await connection.QueryFirstOrDefaultAsync<decimal>("select COALESCE(sum(o.\"Total\"), 0) from \"Orders\" o");
                return total;
            }
            catch (Exception ex)
            {
                return new Error("GetTotalOrdersERROR", ErrorType.General, ex.Message);
            }
        }
    }
}
