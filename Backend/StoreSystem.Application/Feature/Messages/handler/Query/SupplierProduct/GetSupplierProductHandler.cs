using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using SupplierProductEntity = StoreSystem.Core.Entities.SupplierProduct;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetSupplierProductHandler : IRequestHandler<GetSupplierProductsRequest, Result<PagedResult<SupplierProductModel>>>
    {
        private readonly IRepository<SupplierProductEntity> _Repo;
        public GetSupplierProductHandler(IRepository<SupplierProductEntity> Repo) => _Repo = Repo;

        public async Task<Result<PagedResult<SupplierProductModel>>> Handle(GetSupplierProductsRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetAll(request.PageNumber, request.PageSize,
                projection: sp => new SupplierProductModel(sp.Id, sp.ProductId, sp.SupplierId, sp.Quantity, sp.CostPrice, sp.CreatedAt));
        }
    }
}
