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
using SupplierProductEntity = StoreSystem.Core.Entities.SupplierProduct;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddSupplierProductHandler : IRequestHandler<AddSupplierProductRequest, Result<SupplierProductModel>>
    {
        private readonly IRepository<SupplierProductEntity> _Repo;
        private readonly IMapper _Mapper;

        public AddSupplierProductHandler(IRepository<SupplierProductEntity> repo, IMapper Mapper)
        {
            _Repo = repo;
            _Mapper = Mapper;
        }

        public async Task<Result<SupplierProductModel>> Handle(AddSupplierProductRequest request, CancellationToken cancellationToken)
        {
            var supplierProduct = new SupplierProductEntity
            {
                ProductId = request.ProductId,
                SupplierId = request.SupplierId,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _Repo.Add(supplierProduct);
            if (!result.IsSuccess) return result.Error!;

            return _Mapper.Map<SupplierProductModel>(result.Value);
        }
    }
}
