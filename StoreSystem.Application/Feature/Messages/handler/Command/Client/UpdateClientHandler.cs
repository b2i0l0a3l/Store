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
    public class UpdateClientHandler : IRequestHandler<UpdateClientRequest, Result<bool>>
    {
        private readonly IRepository<Client> _Repo;

        public UpdateClientHandler(IRepository<Client> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(UpdateClientRequest request, CancellationToken cancellationToken)
        {
            Result<bool> result = await _Repo.Update(request.Id, c =>
            {
                c.Name = request.Name;
                c.PhoneNumber = request.PhoneNumber;
            });

            return result;
        }
    }
}
