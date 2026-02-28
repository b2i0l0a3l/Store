using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IGetProductsFucntion _Repo;
        public GetProductHandler(IGetProductsFucntion Repo)
        {
            _Repo = Repo;
        }
        public async Task<Result<PagedResult<ProductsModel>>> Handle(GetProductsRequest request, CancellationToken cancellationToken)
        {
            return await  _Repo.GetProductsAsync(request.PageNumber,request.PageSize);
        }
    }
}