using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces.functions.ClientFunctions;
using StoreSystem.Core.Models.ClientModels;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.ClientFunctions
{
    public class FnClientRankingFunction : IFnClientRankingFunction
    {
        private readonly AppDbContext _context;

        public FnClientRankingFunction(AppDbContext context) => _context = context;

        public async Task<Result<IEnumerable<ClientRankingModel>>> Handle()
        {
            var connection = _context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();

            try
            {
                var result = await connection.QueryAsync<ClientRankingModel>("select * from fn_client_ranking()");
                var rankings = result.ToList();
                if (rankings == null || rankings.Count == 0) return Errors.DataNotFoundError;
                return rankings;
            }
            catch
            {
                return new Error("GetClientRankingERROR", StoreSystem.Core.enums.ErrorType.Failure, "A database error occurred.");
            }
        }
    }
}
