using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces.functions;
using StoreSystem.Core.Models.DebtModels;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.DebtFunctions
{
    public class GetDebts : IGetDebts
    {
        private readonly AppDbContext _Context;
        public GetDebts(AppDbContext context) => _Context = context;

        public async Task<Result<IEnumerable<GetDebtModel>>> GetResultAsync()
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            try
            {
                var result = await connection.QueryAsync<GetDebtModel>("select * from fn_get_all_debts()");
                List<GetDebtModel> orders = result.ToList();
                if (orders == null || orders.Count <= 0) return Errors.DataNotFoundError;
                return orders;
            }
            catch (Exception ex)
            {
                return new Error("GetDebtERROR", ErrorType.General, ex.Message);
            }
        }
    }
}