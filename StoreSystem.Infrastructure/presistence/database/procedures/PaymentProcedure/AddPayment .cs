using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.procedures
{
    public class AddPayment : IAddPaymentProcedure
    {
        private readonly AppDbContext _Context;
        public AddPayment(AppDbContext context) => _Context = context;
        public async Task<Result> Handle(AddPaymentModel req)
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            using var transaction = await _Context.Database.BeginTransactionAsync();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("p_debt_id", req.DebtId);
                parameters.Add("p_amount", req.Amount);

                var result = await connection.ExecuteAsync("CALL sp_add_payment(@p_debt_id,@p_amount)",
                    parameters,
                    transaction: transaction.GetDbTransaction()
                );
                await transaction.CommitAsync();
                return Result.Success();
            }
            catch (Exception ex)
            {
                await _Context.Database.RollbackTransactionAsync();
                return new Error("DeleteOrderWithHisItemERROR", ErrorType.General, ex.Message);
            }
        }
    }
}