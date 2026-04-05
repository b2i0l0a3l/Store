using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces.functions.PaymentFunctions;
using StoreSystem.Core.Models.PaymentModels;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.functions.PaymentFunctions
{
    public class FnGetAllPaymentsFunction : IFnGetAllPaymentsFunction
    {

        private readonly AppDbContext _Context;
        public FnGetAllPaymentsFunction(AppDbContext context) => _Context = context;

        public async Task<Result<IEnumerable<GetAllPaymentModel>>> Handle()
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            try
            {
                var result = await connection.QueryAsync<GetAllPaymentModel>("select * from fn_get_payments()");
                List<GetAllPaymentModel> payments = result.ToList();
                if (payments == null || payments.Count <= 0) return Errors.DataNotFoundError;
                return payments;
            }
            catch
            {
                return new Error("GetAllPaymentsERROR", StoreSystem.Core.enums.ErrorType.Failure, "A database error occurred.");
            }
        }
    }
}