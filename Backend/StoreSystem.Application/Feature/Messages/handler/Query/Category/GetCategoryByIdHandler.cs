using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetCategoryByIdHandler : IRequestHandler<GetCategoryByIdRequest, Result<CategoryModel>>
    {
        private readonly IQueryService<Category> _query;
        public GetCategoryByIdHandler(IQueryService<Category> query) => _query = query;

        public async Task<Result<CategoryModel>> Handle(GetCategoryByIdRequest request, CancellationToken cancellationToken)
        {
            return await _query.FindById(request.Id, c => new CategoryModel(c.Id, c.Name));
        }
    }
}
