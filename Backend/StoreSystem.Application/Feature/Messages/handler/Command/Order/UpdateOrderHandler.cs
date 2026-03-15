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
    public class UpdateOrderHandler : IRequestHandler<UpdateOrderRequest, Result>
    {
        private readonly IUpdateOrderProcedure _Repo;

        public UpdateOrderHandler(IUpdateOrderProcedure Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result> Handle(UpdateOrderRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Handle(request.Model);
            return result;
        }
    }
}
