using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetCategoryHandler : IRequestHandler<GetCategoriesRequest, Result<PagedResult<CategoryModel>>>
    {
        private readonly IQueryService<Category> _query;
        public GetCategoryHandler(IQueryService<Category> query) => _query = query;

        public async Task<Result<PagedResult<CategoryModel>>> Handle(GetCategoriesRequest request, CancellationToken cancellationToken)
        {
            return await _query.GetPaged(request.PageNumber, request.PageSize, c => new CategoryModel(c.Id, c.Name));
        }
    }
}
