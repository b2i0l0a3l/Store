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
    public class UpdateOrderItemHandler : IRequestHandler<UpdateOrderItemRequest, Result<bool>>
    {
        private readonly IRepository<OrderItem> _Repo;

        public UpdateOrderItemHandler(IRepository<OrderItem> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(UpdateOrderItemRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Update(request.Id, o =>
            {
                o.ProductId = request.ProductId;
                o.Price = request.Price;
            });

            return result;
        }
    }
}
