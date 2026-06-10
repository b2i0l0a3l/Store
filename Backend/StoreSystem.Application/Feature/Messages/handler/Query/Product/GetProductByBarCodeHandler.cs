using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query.Product;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetProductByBarCodeHandler : IRequestHandler<GetProductByBarCode, Result<ProductsModel>>
    {
        private readonly IQueryService<Product> _Repo;
        public GetProductByBarCodeHandler(IQueryService<Product> Repo)
        {
            _Repo = Repo;
        }
        public async Task<Result<ProductsModel>> Handle(GetProductByBarCode request, CancellationToken cancellationToken)
        {
            Result<ProductsModel> result = await _Repo.FindOneSingle(
                x => x.BarCode == request.BarCode,
                x => new ProductsModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Price = x.Price,
                    CategoryName = x.Category.Name,
                    Quantity = x.Quantity,
                    Cost = x.Cost,
                    ImageUrl = x.ImagePath,
                    Barcode = x.BarCode,
                    CreatedAt = x.CreatedAt
                });
            if (!result.IsSuccess && result.Value == null)
            {
                return result.Error!;
            }
            return result;
            
        }
    }
}