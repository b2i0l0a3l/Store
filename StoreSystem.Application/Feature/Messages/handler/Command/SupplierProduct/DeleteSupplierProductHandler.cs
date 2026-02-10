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
    public class DeleteSupplierProductHandler : IRequestHandler<DeleteSupplierProductRequest, Result<bool>>
    {
        private readonly IUniteOfWork _Uow;

        public DeleteSupplierProductHandler(IUniteOfWork uow)
        {
            _Uow = uow;
        }

        public async Task<Result<bool>> Handle(DeleteSupplierProductRequest request, CancellationToken cancellationToken)
        {
            return await _Uow.SupplierProduct.Delete(request.Id);
        }
    }
}

