using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public record GetDebtsRequest : IRequest<Result<PagedResult<DebtModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
