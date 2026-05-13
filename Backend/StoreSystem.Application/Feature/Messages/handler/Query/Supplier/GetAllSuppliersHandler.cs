using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllSuppliersHandler : IRequestHandler<GetAllSuppliersRequest, Result<IEnumerable<SupplierModel>>>
    {
        private readonly IRepository<Supplier> _repo;
        public GetAllSuppliersHandler(IRepository<Supplier> repo) => _repo = repo;

        public async Task<Result<IEnumerable<SupplierModel>>> Handle(GetAllSuppliersRequest request, CancellationToken cancellationToken)
        {
            return await _repo.All(
                projection: s => new SupplierModel(s.Id, s.Name, s.PhoneNumber));
        }
    }
}
