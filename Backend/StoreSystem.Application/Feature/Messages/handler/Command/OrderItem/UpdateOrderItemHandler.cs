using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

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
            UpdateOrderItemModel req = new()
            {
                OrderItemId = request.OrderItemId,
                Price = request.Price,
                Quantity = request.Quantity
            };
            var result = await _Repo.handle(req);   
            return result;
        }
    }
}
