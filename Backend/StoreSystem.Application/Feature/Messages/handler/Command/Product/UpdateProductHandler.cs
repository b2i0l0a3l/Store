using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class UpdateProductHandler : IRequestHandler<UpdateProductRequest, Result<bool>>
    {
        private readonly IRepository<Product> _Repo;
        private readonly IAppwriteStorageService _storageService;
        private readonly IQueryService<Product> _productRepo;
        public UpdateProductHandler(IQueryService<Product> productRepo, IRepository<Product> Repo, IAppwriteStorageService storageService)
        {
            _storageService = storageService;
            _Repo = Repo;
            _productRepo = productRepo;
        }

        public async Task<Result<bool>> Handle(UpdateProductRequest request, CancellationToken cancellationToken)
        {
            
            var existingProductResult = await _productRepo.FindById(request.Id, p => new { p.FileId });

            if (!existingProductResult.IsSuccess || existingProductResult.Value == null)
            {
                return new Error("ProductNotFound", Core.enums.ErrorType.NotFound, "Product not found.");
            }


                ImageUploadResult? newImagePath = null;

            if (request.ProductImage != null && request.ProductImage.Length > 0)
                    newImagePath = await _storageService.UpdateImageAsync(existingProductResult.Value.FileId, request.ProductImage);
            
            
            var result = await _Repo.Update(request.Id, p =>
            {
                p.Name = request.Name;
                p.Price = request.Price;
                p.Cost = request.Cost;
                p.Quantity = request.Quantity;
                p.CategoryId = request.CategoryId;
                p.BarCode = request.CodeBar;
                p.Description = request.Description;
                if (newImagePath != null)
                {
                    p.ImagePath = newImagePath.ImageUrl;
                    p.FileId = newImagePath.FileId;
                }
            });
            return result;
        }
    }
}
