using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models.PaymentModels;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public record GetAllPaymentsRequest : IRequest<Result<IEnumerable<GetAllPaymentModel>>>;
}
