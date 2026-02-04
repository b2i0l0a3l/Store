using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class UpdateSupplierProductHandler : IRequestHandler<UpdateSupplierProductRequest, Result<bool>>
    {
        private readonly IRepository<SupplierProduct> _Repo;

        public UpdateSupplierProductHandler(IRepository<SupplierProduct> Repo)
        {
            _Repo = Repo;
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
