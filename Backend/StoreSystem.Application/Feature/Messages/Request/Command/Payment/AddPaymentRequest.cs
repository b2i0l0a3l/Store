using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class AddPaymentRequest : IRequest<Result>
    {
        public int DebtId { get; set; }
        public decimal Amount { get; set; }
        public string? Notes { get; set; }  
        public enPaymentMethod PaymentMethod { get; set; } = enPaymentMethod.Cash;

    }
}
