using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetReturnsHandler : IRequestHandler<GetReturnsRequest, Result<PagedResult<ReturnModel>>>
    {
        private readonly IQueryService<Return> _query;
        public GetReturnsHandler(IQueryService<Return> query) => _query = query;

        public async Task<Result<PagedResult<ReturnModel>>> Handle(GetReturnsRequest request, CancellationToken cancellationToken)
        {
            return await _query.GetPaged(request.PageNumber, request.PageSize,
                r => new ReturnModel(r.Id, r.OrderId, r.TotalRefund, r.CreatedAt));
        }
    }
}
