using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public record GetPaymentsRequest : IRequest<Result<PagedResult<PaymentModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
