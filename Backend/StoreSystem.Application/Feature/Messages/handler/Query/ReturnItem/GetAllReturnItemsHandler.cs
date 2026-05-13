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
        private readonly IRepository<ReturnItem> _repo;
        public GetAllReturnItemsHandler(IRepository<ReturnItem> repo) => _repo = repo;

        public async Task<Result<IEnumerable<ReturnItemModel>>> Handle(GetAllReturnItemsRequest request, CancellationToken cancellationToken)
        {
            return await _repo.All(
                projection: ri => new ReturnItemModel(ri.Id, ri.ReturnId, ri.ProductId, ri.Quantity, ri.Price, ri.CreatedAt));
        }
    }
}
