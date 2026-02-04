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
    public class AddSupplierProductHandler : IRequestHandler<AddSupplierProductRequest, Result<SupplierProductModel>>
    {
        private readonly IRepository<SupplierProduct> _Repo;
        private readonly IMapper _Mapper;

        public AddSupplierProductHandler(IRepository<SupplierProduct> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }

        public async Task<Result<SupplierProductModel>> Handle(AddSupplierProductRequest request, CancellationToken cancellationToken)
        {
            var supplierProduct = new SupplierProduct
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
