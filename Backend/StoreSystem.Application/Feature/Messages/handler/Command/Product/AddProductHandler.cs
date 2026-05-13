using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddProductHandler : IRequestHandler<AddProductRequest, Result<int>>
    {
        private readonly IRepository<Product> _Repo;

        public AddProductHandler(IRepository<Product> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<int>> Handle(AddProductRequest request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Name = request.Name,
                Price = request.Price,
                Cost = request.Cost,
                CategoryId = request.CategoryId,
                ImagePath = request.ImagePath
            };

            var result = await _Repo.Add(product);
            return result;
        }
    }
}
