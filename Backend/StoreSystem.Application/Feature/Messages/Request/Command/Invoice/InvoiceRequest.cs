using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.Models;
using StoreSystem.Core.Models.Invoice;

namespace StoreSystem.Application.Feature.Messages.Request.Command.Invoice
{
    public class InvoiceRequest :IRequest<Result>
    {
        public int ClientId { get; set; }
        public required List<InvoiceItem> Items { get; set; }

    }
}