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
        private readonly IRepository<Category> _repo;

        public GetAllCategoriesHandler(IRepository<Category> repo)
        {
            _repo = repo;
        }

        public async Task<Result<IEnumerable<CategoryModel>>> Handle(GetAllCategoriesRequest request, CancellationToken cancellationToken)
        {
            var result = await _repo.All();
            if (!result.IsSuccess) return result.Error!;

            var records = result.Value!.Select(x => CategoryModel.FromEntity(x));
            return Result<IEnumerable<CategoryModel>>.Success(records);
        }
    }
}
