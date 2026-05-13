using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using SupplierProductEntity = StoreSystem.Core.Entities.SupplierProduct;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetSupplierProductByIdHandler : IRequestHandler<GetSupplierProductByIdRequest, Result<SupplierProductModel>>
    {
        private readonly IRepository<SupplierProductEntity> _Repo;
        public GetSupplierProductByIdHandler(IRepository<SupplierProductEntity> repo) => _Repo = repo;

        public async Task<Result<SupplierProductModel>> Handle(GetSupplierProductByIdRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetById(request.Id,
                projection: sp => new SupplierProductModel(sp.Id, sp.ProductId, sp.SupplierId, sp.Quantity, sp.CostPrice, sp.CreatedAt));
        }
    }
}
