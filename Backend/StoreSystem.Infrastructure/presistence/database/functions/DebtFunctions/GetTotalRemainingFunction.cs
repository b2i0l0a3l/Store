using System;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces.functions.DebtFunctions;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.DebtFunctions
{
    public class GetTotalRemainingFunction : IGetTotalRemainingFunction
    {
        private readonly AppDbContext _context;

        public GetTotalRemainingFunction(AppDbContext context) => _context = context;

        public async Task<Result<decimal>> Handle()
        {
            var connection = _context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();

            try
            {
                var remaining = await connection.QueryFirstOrDefaultAsync<decimal>("select COALESCE(sum(d.\"Remaining\"), 0) from \"Debts\" d");
                return remaining;
            }
            catch (Exception ex)
            {
                return new Error("GetTotalRemainingERROR", ErrorType.General, ex.Message);
            }
        }
    }
}
