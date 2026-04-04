using System;
using System.Data;
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
    public class FnCashVsDebtRatioFunction : IFnCashVsDebtRatioFunction
    {
        private readonly AppDbContext _context;

        public FnCashVsDebtRatioFunction(AppDbContext context) => _context = context;

        public async Task<Result<CashVsDebtRatioModel>> Handle()
        {
            var connection = _context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();

            try
            {
                var result = await connection.QueryFirstOrDefaultAsync<CashVsDebtRatioModel>("select * from fn_cash_vs_debt_ratio()");
                
                if (result == null) return Errors.DataNotFoundError;
                return result;
            }
            catch
            {
                return new Error("GetCashVsDebtRatioERROR", StoreSystem.Core.enums.ErrorType.Failure, "A database error occurred.");
            }
        }
    }
}
