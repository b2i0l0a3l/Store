using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetPaymentByIdRequest : IRequest<Result<PaymentModel>>
    {
        public int Id { get; set; }
    }
}
