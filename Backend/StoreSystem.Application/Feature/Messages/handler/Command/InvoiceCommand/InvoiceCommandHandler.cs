using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command.Invoice;
using StoreSystem.Application.Interface;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.handler.Command.InvoiceCommand
{
    public class InvoiceCommandHandler : IRequestHandler<InvoiceRequest,Result<string>>
    {
        private readonly IGenerateInvoiceHtml _GenerateInvoiceHtml;
        public InvoiceCommandHandler(IGenerateInvoiceHtml GenerateInvoiceHtml)
        {
            _GenerateInvoiceHtml = GenerateInvoiceHtml;
        }
        public async Task<Result<string>> Handle(InvoiceRequest request, CancellationToken cancellationToken)
        {
            string res = await _GenerateInvoiceHtml.GenerateInvoiceHtml(new Core.Models.Invoice.InvoiceModel() { Items = request.Items, ClientId = request.ClientId ?? null });
            return res;
        }
    }
}