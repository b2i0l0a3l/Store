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
    public class DeleteSupplierHandler : IRequestHandler<DeleteSupplierRequest, Result<bool>>
    {
        private readonly IRepository<Supplier> _Repo;

        public DeleteSupplierHandler(IRepository<Supplier> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(DeleteSupplierRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.Delete(request.Id);
        }
    }
}
