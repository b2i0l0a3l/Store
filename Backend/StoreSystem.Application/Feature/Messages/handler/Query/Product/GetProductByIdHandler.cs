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
        private readonly IQueryService<Product> _query;
        public GetProductByIdHandler(IQueryService<Product> query) => _query = query;

        public async Task<Result<ProductModel>> Handle(GetProductByIdRequest request, CancellationToken cancellationToken)
        {
            return await _query.FindById(request.Id,
                p => new ProductModel(p.Id, p.Name, p.Price, p.Cost, p.CategoryId, p.ImagePath));
        }
    }
}
