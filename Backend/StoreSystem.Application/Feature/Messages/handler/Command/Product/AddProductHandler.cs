using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddProductHandler : IRequestHandler<AddProductRequest, Result<int>>
    {
        private readonly IRepository<Product> _Repo;
        private readonly IAppwriteStorageService _storageService;
        public AddProductHandler(IRepository<Product> Repo, IAppwriteStorageService storageService)
        {
            _storageService = storageService;
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
                BarCode = request.CodeBar,
                Quantity = request.Quantity,
                Description = request.Description
            };

            if(request.ProductImage != null && request.ProductImage.Length > 0)
            {
                ImageUploadResult? ImagePath = await _storageService.UploadImageAsync(request.ProductImage);
                if (ImagePath != null)
                {
                Console.WriteLine($"Image upload result: Success={ImagePath != null}, ImageUrl={ImagePath?.ImageUrl}, FileId={ImagePath?.FileId}");
                product.ImagePath = ImagePath.ImageUrl;
                product.FileId = ImagePath.FileId;
                    
                }
            }

            var result = await _Repo.Add(product);
            return result;
        }
    }
}
