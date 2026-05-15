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
        private readonly IQueryService<Supplier> _query;
        public GetAllSuppliersHandler(IQueryService<Supplier> query) => _query = query;

        public async Task<Result<IEnumerable<SupplierModel>>> Handle(GetAllSuppliersRequest request, CancellationToken cancellationToken)
        {
            var result = await _query.GetAll(s => new SupplierModel(s.Id, s.Name, s.PhoneNumber));
            if (!result.IsSuccess) return result.Error!;
            return Result<IEnumerable<SupplierModel>>.Success(result.Value!);
        }
    }
}
