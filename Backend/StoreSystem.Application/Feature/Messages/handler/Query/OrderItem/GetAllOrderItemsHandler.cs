using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllOrderItemsHandler : IRequestHandler<GetAllOrderItemsRequest, Result<IEnumerable<OrderItemModel>>>
    {
        private readonly IQueryService<OrderItem> _query;
        public GetAllOrderItemsHandler(IQueryService<OrderItem> query) => _query = query;

        public async Task<Result<IEnumerable<OrderItemModel>>> Handle(GetAllOrderItemsRequest request, CancellationToken cancellationToken)
        {
            var result = await _query.GetAll(oi => new OrderItemModel(oi.Id, oi.ProductId, oi.Price, oi.Quantity));
            if (!result.IsSuccess) return result.Error!;
            return Result<IEnumerable<OrderItemModel>>.Success(result.Value!);
        }
    }
}
