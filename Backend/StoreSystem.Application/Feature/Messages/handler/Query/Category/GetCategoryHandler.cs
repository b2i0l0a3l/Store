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
        private readonly IRepository<Category> _Repo;
        public GetCategoryHandler(IRepository<Category> Repo) => _Repo = Repo;

        public async Task<Result<PagedResult<CategoryModel>>> Handle(GetCategoriesRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetAll(request.PageNumber, request.PageSize,
                projection: c => new CategoryModel(c.Id, c.Name));
        }
    }
}
