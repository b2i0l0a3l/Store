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
    public class UpdateReturnItemHandler : IRequestHandler<UpdateReturnItemRequest, Result<bool>>
    {
        private readonly IRepository<ReturnItem> _Repo;

        public UpdateReturnItemHandler(IRepository<ReturnItem> repo)
        {
            _Repo = repo;
        }

        public async Task<Result<bool>> Handle(UpdateReturnItemRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Update(request.Id, ri =>
            {
                ri.ReturnId = request.ReturnId;
                ri.ProductId = request.ProductId;
                ri.Quantity = request.Quantity;
                ri.Price = request.Price;
            });

            return result;
        }
    }
}
