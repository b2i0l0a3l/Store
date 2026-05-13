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
        private readonly IRepository<OrderItem> _repo;
        public GetAllOrderItemsHandler(IRepository<OrderItem> repo) => _repo = repo;

        public async Task<Result<IEnumerable<OrderItemModel>>> Handle(GetAllOrderItemsRequest request, CancellationToken cancellationToken)
        {
            return await _repo.All(
                projection: oi => new OrderItemModel(oi.Id, oi.ProductId, oi.Price, oi.Quantity));
        }
    }
}
