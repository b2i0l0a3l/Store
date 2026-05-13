using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using OrderEntity = StoreSystem.Core.Entities.Order;

namespace StoreSystem.Application.Feature.Messages.handler.Query.Order
{
    public class GetOrderHandler : IRequestHandler<GetOrdersRequest, Result<PagedResult<OrderModel>>>
    {
        private readonly IRepository<OrderEntity> _Repo;
        public GetOrderHandler(IRepository<OrderEntity> Repo) => _Repo = Repo;

        public async Task<Result<PagedResult<OrderModel>>> Handle(GetOrdersRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetAll(request.PageNumber, request.PageSize,
                projection: o => new OrderModel(o.Id, o.ClientId ?? 0, o.Total, o.OrderStatus, o.OrderType, o.CreatedAt, o.UpdatedAt));
        }
    }
}
