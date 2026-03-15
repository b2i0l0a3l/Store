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
    public class DeleteReturnItemHandler : IRequestHandler<DeleteReturnItemRequest, Result<bool>>
    {
        private readonly IRepository<ReturnItem> _Repo;

        public DeleteReturnItemHandler(IRepository<ReturnItem> repo)
        {
            _Repo = repo;
        }

        public async Task<Result<bool>> Handle(DeleteReturnItemRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.Delete(request.Id);
        }
    }
}
