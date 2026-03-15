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
    public class UpdateOrderItemHandler : IRequestHandler<UpdateOrderItemRequest, Result>
    {
        private readonly IUpdateOrderItemProcedure _Repo;

        public UpdateOrderItemHandler(IUpdateOrderItemProcedure Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result> Handle(UpdateOrderItemRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.handle(request.request);   
            return result;
        }
    }
}
