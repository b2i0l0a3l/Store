using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using SupplierProductEntity = StoreSystem.Core.Entities.SupplierProduct;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddSupplierProductHandler : IRequestHandler<AddSupplierProductRequest, Result<int>>
    {
        private readonly IRepository<SupplierProductEntity> _Repo;

        public AddSupplierProductHandler(IRepository<SupplierProductEntity> repo)
        {
            _Repo = repo;
        }

        public async Task<Result<int>> Handle(AddSupplierProductRequest request, CancellationToken cancellationToken)
        {
            var supplierProduct = new SupplierProductEntity
            {
                ProductId = request.ProductId,
                SupplierId = request.SupplierId,
                CreatedAt = DateTime.UtcNow,
                Quantity = request.Quantity,
                CostPrice = request.CostPrice
            };

            var result = await _Repo.Add(supplierProduct);
            return result;
        }
    }
}
