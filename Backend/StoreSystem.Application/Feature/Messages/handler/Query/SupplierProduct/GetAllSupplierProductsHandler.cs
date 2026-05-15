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
        private readonly IQueryService<SupplierProductEntity> _query;
        public GetAllSupplierProductsHandler(IQueryService<SupplierProductEntity> query) => _query = query;

        public async Task<Result<IEnumerable<SupplierProductModel>>> Handle(GetAllSupplierProductsRequest request, CancellationToken cancellationToken)
        {
            var result = await _query.GetAll(
                sp => new SupplierProductModel(sp.Id, sp.ProductId, sp.SupplierId, sp.Quantity, sp.CostPrice, sp.CreatedAt));
            if (!result.IsSuccess) return result.Error!;
            return Result<IEnumerable<SupplierProductModel>>.Success(result.Value!);
        }
    }
}
