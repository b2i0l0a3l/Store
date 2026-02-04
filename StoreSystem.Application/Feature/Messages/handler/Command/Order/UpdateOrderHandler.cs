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
    public class UpdateOrderHandler : IRequestHandler<UpdateOrderRequest, Result<bool>>
    {
        private readonly IRepository<Order> _Repo;

        public UpdateOrderHandler(IRepository<Order> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(UpdateOrderRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Update(request.Id, o =>
            {
                o.ClientId = request.ClientId;
                o.Total = request.Total;
            });

            return result;
        }
    }
}
