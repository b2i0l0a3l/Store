using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetSupplierProductByIdHandler : IRequestHandler<GetSupplierProductByIdRequest, Result<SupplierProductModel>>
    {
        private readonly IRepository<SupplierProduct> _Repo;
        public GetSupplierProductByIdHandler(IRepository<SupplierProduct> repo)
        {
            _Repo = repo;        }

        public async Task<Result<SupplierProductModel>> Handle(GetSupplierProductByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.GetById(request.Id);
            if (!result.IsSuccess || result.Value == null)
                return new Error("NotFound", Core.enums.ErrorType.General, $"SupplierProduct with Id {request.Id} not found");

            return SupplierProductModel.FromEntity(result.Value);
        }
    }
}
