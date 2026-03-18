using MediatR;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class AddPaymentRequest : IRequest<Result>
    {
        public int DebtId { get; set; }
        public decimal Amount { get; set; }

    }
}
