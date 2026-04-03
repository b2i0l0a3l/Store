using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.Models.Invoice;

namespace StoreSystem.Core.interfaces.functions
{
    public interface IInvoiceProcedure
    {
        Task<Result> handle(InvoiceModel invoice);
    }
}