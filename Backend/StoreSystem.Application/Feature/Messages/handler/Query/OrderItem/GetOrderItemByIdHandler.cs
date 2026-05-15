using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetOrderItemByIdHandler : IRequestHandler<GetOrderItemByIdRequest, Result<OrderItemModel>>
    {
        private readonly IQueryService<OrderItem> _query;
        public GetOrderItemByIdHandler(IQueryService<OrderItem> query) => _query = query;

        public async Task<Result<OrderItemModel>> Handle(GetOrderItemByIdRequest request, CancellationToken cancellationToken)
        {
            return await _query.FindById(request.Id,
                oi => new OrderItemModel(oi.Id, oi.ProductId, oi.Price, oi.Quantity));
        }
    }
}
