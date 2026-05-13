using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetReturnItemByIdHandler : IRequestHandler<GetReturnItemByIdRequest, Result<ReturnItemModel>>
    {
        private readonly IRepository<ReturnItem> _Repo;
        public GetReturnItemByIdHandler(IRepository<ReturnItem> repo) => _Repo = repo;

        public async Task<Result<ReturnItemModel>> Handle(GetReturnItemByIdRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetById(request.Id,
                projection: ri => new ReturnItemModel(ri.Id, ri.ReturnId, ri.ProductId, ri.Quantity, ri.Price, ri.CreatedAt));
        }
    }
}
