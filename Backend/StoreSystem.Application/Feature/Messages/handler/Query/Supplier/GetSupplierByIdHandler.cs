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
        private readonly IRepository<Supplier> _Repo;
        public GetSupplierByIdHandler(IRepository<Supplier> repo)
        {
            _Repo = repo;        }

        public async Task<Result<SupplierModel>> Handle(GetSupplierByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.GetById(request.Id);
            if (!result.IsSuccess || result.Value == null)
                return new Error("NotFound", Core.enums.ErrorType.General, $"Supplier with Id {request.Id} not found");

            return SupplierModel.FromEntity(result.Value);
        }
    }
}
