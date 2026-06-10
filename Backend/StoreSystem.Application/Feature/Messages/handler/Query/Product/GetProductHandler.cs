using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetProductHandler : IRequestHandler<GetProductsRequest, Result<PagedResult<ProductsModel>>>
    {
        private readonly IQueryService<Product> _Repo;
        public GetProductHandler(IQueryService<Product> Repo)
        {
            _Repo = Repo;
        }
        public async Task<Result<PagedResult<ProductsModel>>> Handle(GetProductsRequest request, CancellationToken cancellationToken)
        {
            Expression<Func<Product, ProductsModel>> projection = x => new ProductsModel
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
                FileId = x.FileId,
                CreatedAt = x.CreatedAt

            };

            var productName = string.IsNullOrWhiteSpace(request.ProductName) ? null : request.ProductName.Trim().ToLower();
            var categoryName = string.IsNullOrWhiteSpace(request.CategoryName) ? null : request.CategoryName.Trim().ToLower();
            var barCode = string.IsNullOrWhiteSpace(request.BarCode) ? null : request.BarCode.Trim().ToLower();

            Expression<Func<Product, bool>> predicate = x =>
                (productName == null || x.Name.ToLower().Contains(productName))
                && (categoryName == null || x.Category.Name.ToLower().Contains(categoryName))
                && (barCode == null || x.BarCode.ToLower().Contains(barCode));

            return await _Repo.GetPaged(request.PageNumber, request.PageSize, projection, predicate, x => x.CreatedAt);
        }
    }
}