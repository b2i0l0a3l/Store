using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.Models.Invoice;

namespace StoreSystem.Application.Interface
{
    public interface IGenerateInvoiceHtml
    {
        Task<string> GenerateInvoiceHtml(InvoiceModel invoice);
    }
}