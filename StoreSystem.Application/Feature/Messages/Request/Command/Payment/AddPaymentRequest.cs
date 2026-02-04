using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class AddPaymentRequest : IRequest<Result<PaymentModel>>
    {
        public int DebtID { get; set; }
        public decimal Amount { get; set; }
    }
}
