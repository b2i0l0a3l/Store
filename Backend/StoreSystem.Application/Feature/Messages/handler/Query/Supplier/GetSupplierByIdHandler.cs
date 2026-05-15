using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetSupplierByIdHandler : IRequestHandler<GetSupplierByIdRequest, Result<SupplierModel>>
    {
        private readonly IQueryService<Supplier> _query;
        public GetSupplierByIdHandler(IQueryService<Supplier> query) => _query = query;

        public async Task<Result<SupplierModel>> Handle(GetSupplierByIdRequest request, CancellationToken cancellationToken)
        {
            return await _query.FindById(request.Id,
                s => new SupplierModel(s.Id, s.Name, s.PhoneNumber));
        }
    }
}
