using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddCategoryHandler : IRequestHandler<AddCategoryRequest, Result<int>>
    {
        private readonly IRepository<Category> _Repo;

        public AddCategoryHandler(IRepository<Category> repo)
        {
            _Repo = repo;
        }

        public async Task<Result<int>> Handle(AddCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = new Category
            {
                Name = request.Name
            };

            var result = await _Repo.Add(category);
            return result;
        }
    }
}
