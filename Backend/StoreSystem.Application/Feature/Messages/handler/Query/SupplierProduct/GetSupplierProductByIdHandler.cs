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
        private readonly IQueryService<SupplierProductEntity> _query;
        public GetSupplierProductByIdHandler(IQueryService<SupplierProductEntity> query) => _query = query;

        public async Task<Result<SupplierProductModel>> Handle(GetSupplierProductByIdRequest request, CancellationToken cancellationToken)
        {
            return await _query.FindById(request.Id,
                sp => new SupplierProductModel(sp.Id, sp.ProductId, sp.SupplierId, sp.Quantity, sp.CostPrice, sp.CreatedAt));
        }
    }
}
