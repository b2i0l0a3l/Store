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

        public GetAllCategoriesHandler(IRepository<Category> repo) => _repo = repo;

        public async Task<Result<IEnumerable<CategoryModel>>> Handle(GetAllCategoriesRequest request, CancellationToken cancellationToken)
        {
            // Projecting directly from SQL to CategoryModel DTO
            return await _repo.All(
                projection: c => new CategoryModel(c.Id, c.Name));
        }
    }
}
