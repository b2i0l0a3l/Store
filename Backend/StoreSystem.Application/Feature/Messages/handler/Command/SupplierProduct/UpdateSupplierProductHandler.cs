using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using SupplierProductEntity = StoreSystem.Core.Entities.SupplierProduct;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class UpdateSupplierProductHandler : IRequestHandler<UpdateSupplierProductRequest, Result<bool>>
    {
        private readonly IRepository<SupplierProductEntity> _Repo;

        public UpdateSupplierProductHandler(IRepository<SupplierProductEntity> repo)
        {
            _Repo = repo;
        }

        public async Task<Result<bool>> Handle(UpdateSupplierProductRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Update(request.Id, sp =>
            {
                sp.ProductId = request.ProductId;
                sp.SupplierId = request.SupplierId;
            });

            return result;
        }
    }
}
