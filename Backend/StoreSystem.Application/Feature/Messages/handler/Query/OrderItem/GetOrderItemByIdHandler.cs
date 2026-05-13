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
        private readonly IRepository<OrderItem> _Repo;
        public GetOrderItemByIdHandler(IRepository<OrderItem> repo) => _Repo = repo;

        public async Task<Result<OrderItemModel>> Handle(GetOrderItemByIdRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetById(request.Id,
                projection: oi => new OrderItemModel(oi.Id, oi.ProductId, oi.Price, oi.Quantity));
        }
    }
}
