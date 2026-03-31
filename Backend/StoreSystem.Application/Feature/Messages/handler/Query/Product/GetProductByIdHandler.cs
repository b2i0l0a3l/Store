using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetProductByIdHandler : IRequestHandler<GetProductByIdRequest, Result<ProductModel>>
    {
        private readonly IRepository<Product> _Repo;
        public GetProductByIdHandler(IRepository<Product> repo)
        {
            _Repo = repo;        }

        public async Task<Result<ProductModel>> Handle(GetProductByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.GetById(request.Id);
            if (!result.IsSuccess || result.Value == null)
                return new Error("NotFound", Core.enums.ErrorType.General, $"Product with Id {request.Id} not found");
            return ProductModel.FromEntity(result.Value);
        }
    }
}
