using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetReturnItemsHandler : IRequestHandler<GetReturnItemsRequest, Result<PagedResult<ReturnItemModel>>>
    {
        private readonly IQueryService<ReturnItem> _query;
        public GetReturnItemsHandler(IQueryService<ReturnItem> query) => _query = query;

        public async Task<Result<PagedResult<ReturnItemModel>>> Handle(GetReturnItemsRequest request, CancellationToken cancellationToken)
        {
            return await _query.GetPaged(request.PageNumber, request.PageSize,
                ri => new ReturnItemModel(ri.Id, ri.ReturnId, ri.ProductId, ri.Quantity, ri.Price, ri.CreatedAt));
        }
    }
}
