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
    public class DeleteSupplierProductHandler : IRequestHandler<DeleteSupplierProductRequest, Result<bool>>
    {
        private readonly IRepository<SupplierProduct> _Repo;

        public DeleteSupplierProductHandler(IRepository<SupplierProduct> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(DeleteSupplierProductRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.Delete(request.Id);
        }
    }
}
