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
    public class DeleteClientHandler : IRequestHandler<DeleteClientRequest, Result<bool>>
    {
        private readonly IRepository<Client> _Repo;

        public DeleteClientHandler(IRepository<Client> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(DeleteClientRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.Delete(request.Id);
        }
    }
}
