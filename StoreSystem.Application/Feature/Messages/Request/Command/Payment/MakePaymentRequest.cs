using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.Request.Command.Payment
{
    public class MakePaymentRequest : IRequest<Result>
    {
        public int DebtId { get; set; }
        public decimal Amount { get; set; }
    }
}
