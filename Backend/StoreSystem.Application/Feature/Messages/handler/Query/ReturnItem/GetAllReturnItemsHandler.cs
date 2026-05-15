using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllReturnItemsHandler : IRequestHandler<GetAllReturnItemsRequest, Result<IEnumerable<ReturnItemModel>>>
    {
        private readonly IQueryService<ReturnItem> _query;
        public GetAllReturnItemsHandler(IQueryService<ReturnItem> query) => _query = query;

        public async Task<Result<IEnumerable<ReturnItemModel>>> Handle(GetAllReturnItemsRequest request, CancellationToken cancellationToken)
        {
            var result = await _query.GetAll(ri => new ReturnItemModel(ri.Id, ri.ReturnId, ri.ProductId, ri.Quantity, ri.Price, ri.CreatedAt));
            if (!result.IsSuccess) return result.Error!;
            return Result<IEnumerable<ReturnItemModel>>.Success(result.Value!);
        }
    }
}
