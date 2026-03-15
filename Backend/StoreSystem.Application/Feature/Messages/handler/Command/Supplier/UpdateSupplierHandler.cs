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
    public class UpdateSupplierHandler : IRequestHandler<UpdateSupplierRequest, Result<bool>>
    {
        private readonly IRepository<Supplier> _Repo;

        public UpdateSupplierHandler(IRepository<Supplier> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(UpdateSupplierRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Update(request.Id, s =>
            {
                s.Name = request.Name;
                s.PhoneNumber = request.PhoneNumber;
            });

            return result;
        }
    }
}
