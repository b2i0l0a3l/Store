using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using ReturnEntity = StoreSystem.Core.Entities.Return;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class DeleteReturnHandler : IRequestHandler<DeleteReturnRequest, Result<bool>>
    {
        private readonly IRepository<ReturnEntity> _Repo;

        public DeleteReturnHandler(IRepository<ReturnEntity> repo)
        {
            _Repo = repo;
        }

        public async Task<Result<bool>> Handle(DeleteReturnRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.Delete(request.Id);
        }
    }
}
