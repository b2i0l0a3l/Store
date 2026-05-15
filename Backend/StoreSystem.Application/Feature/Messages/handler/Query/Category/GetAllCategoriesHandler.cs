using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllCategoriesHandler : IRequestHandler<GetAllCategoriesRequest, Result<IEnumerable<CategoryModel>>>
    {
        private readonly IQueryService<Category> _query;
        public GetAllCategoriesHandler(IQueryService<Category> query) => _query = query;

        public async Task<Result<IEnumerable<CategoryModel>>> Handle(GetAllCategoriesRequest request, CancellationToken cancellationToken)
        {
            var result = await _query.GetAll(c => new CategoryModel(c.Id, c.Name));
            if (!result.IsSuccess) return result.Error!;
            return Result<IEnumerable<CategoryModel>>.Success(result.Value!);
        }
    }
}
