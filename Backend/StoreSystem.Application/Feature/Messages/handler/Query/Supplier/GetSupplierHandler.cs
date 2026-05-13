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
        private readonly IRepository<Supplier> _Repo;
        public GetSupplierHandler(IRepository<Supplier> Repo) => _Repo = Repo;

        public async Task<Result<PagedResult<SupplierModel>>> Handle(GetSuppliersRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetAll(request.PageNumber, request.PageSize,
                projection: s => new SupplierModel(s.Id, s.Name, s.PhoneNumber));
        }
    }
}
