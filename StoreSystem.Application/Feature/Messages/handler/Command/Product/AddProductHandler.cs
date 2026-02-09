using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddProductHandler : IRequestHandler<AddProductRequest, Result<ProductModel>>
    {
        private readonly IRepository<Product> _Repo;
        private readonly IMapper _Mapper;

        public AddProductHandler(IRepository<Product> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }

        public async Task<Result<ProductModel>> Handle(AddProductRequest request, CancellationToken cancellationToken)
        {
     
            var result = await _Repo.Add(_Mapper.Map<Product>(request));
            if (!result.IsSuccess) return result.Error!;

            return _Mapper.Map<ProductModel>(result.Value);
        }
    }
}
