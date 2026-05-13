using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using SupplierProductEntity = StoreSystem.Core.Entities.SupplierProduct;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllSupplierProductsHandler : IRequestHandler<GetAllSupplierProductsRequest, Result<IEnumerable<SupplierProductModel>>>
    {
        private readonly IRepository<SupplierProductEntity> _repo;

        public GetAllSupplierProductsHandler(IRepository<SupplierProductEntity> repo)
        {
            _repo = repo;
        }

        public async Task<Result<IEnumerable<SupplierProductModel>>> Handle(GetAllSupplierProductsRequest request, CancellationToken cancellationToken)
        {
            return await _repo.All(
                projection: sp => new SupplierProductModel(sp.Id, sp.ProductId, sp.SupplierId, sp.Quantity, sp.CostPrice, sp.CreatedAt));
        }
    }
}
