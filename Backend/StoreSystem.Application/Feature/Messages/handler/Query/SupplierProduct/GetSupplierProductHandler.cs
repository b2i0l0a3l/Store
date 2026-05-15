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
        private readonly IQueryService<SupplierProductEntity> _query;
        public GetSupplierProductHandler(IQueryService<SupplierProductEntity> query) => _query = query;

        public async Task<Result<PagedResult<SupplierProductModel>>> Handle(GetSupplierProductsRequest request, CancellationToken cancellationToken)
        {
            return await _query.GetPaged(request.PageNumber, request.PageSize,
                sp => new SupplierProductModel(sp.Id, sp.ProductId, sp.SupplierId, sp.Quantity, sp.CostPrice, sp.CreatedAt));
        }
    }
}
