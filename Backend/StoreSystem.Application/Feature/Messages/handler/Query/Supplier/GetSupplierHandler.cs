using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetSupplierHandler : IRequestHandler<GetSuppliersRequest, Result<PagedResult<SupplierModel>>>
    {
        private readonly IQueryService<Supplier> _query;
        public GetSupplierHandler(IQueryService<Supplier> query) => _query = query;

        public async Task<Result<PagedResult<SupplierModel>>> Handle(GetSuppliersRequest request, CancellationToken cancellationToken)
        {
            return await _query.GetPaged(request.PageNumber, request.PageSize,
                s => new SupplierModel(s.Id, s.Name, s.PhoneNumber));
        }
    }
}
