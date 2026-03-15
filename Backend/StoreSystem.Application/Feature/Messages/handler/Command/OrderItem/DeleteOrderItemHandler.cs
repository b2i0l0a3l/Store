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
    public class DeleteOrderItemHandler : IRequestHandler<DeleteOrderItemRequest, Result>
    {
        private readonly IDeleteOrderItemProcedure _Repo;

        public DeleteOrderItemHandler(IDeleteOrderItemProcedure Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result> Handle(DeleteOrderItemRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Handle(request.Id);
            return result;
        }
    }
}
