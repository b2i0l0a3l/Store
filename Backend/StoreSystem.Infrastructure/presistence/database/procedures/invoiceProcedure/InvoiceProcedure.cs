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
using StoreSystem.Core.interfaces.functions;
using StoreSystem.Core.Models.Invoice;
using StoreSystem.Infrastructure.HELPER;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.database.procedures.invoiceProcedure
{
    public class InvoiceProcedure : IInvoiceProcedure
    {
        private readonly AppDbContext _Context;
        public InvoiceProcedure(AppDbContext context)
        {
            _Context = context;
        }
        public async Task<Result> handle(InvoiceModel invoice)
        {
            var connection = _Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
                connection.Open();
            using var transaction = await _Context.Database.BeginTransactionAsync();
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("id", invoice.Id);
                parameters.Add("client_id", invoice.ClientId ?? null);
                parameters.AddJsonb(
                    "items",
                    invoice.Items
                );

                var result = await connection.ExecuteAsync("CALL sp_create_invoice(id text,client_id int,items jsonb)",
                     parameters,
                    transaction: transaction.GetDbTransaction()
                );
                await transaction.CommitAsync();
                return Result.Success();
            }
            catch (Exception ex)
            {
                await _Context.Database.RollbackTransactionAsync();
                return new Error("CreateInvoiceERROR", ErrorType.General, ex.Message);

            }
        }
    }
}