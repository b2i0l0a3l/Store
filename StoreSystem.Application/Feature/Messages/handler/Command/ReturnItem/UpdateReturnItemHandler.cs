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
        private readonly IUniteOfWork _Uow;

        public UpdateReturnItemHandler(IUniteOfWork uow)
        {
            _Uow = uow;
        }

        public async Task<Result<bool>> Handle(UpdateReturnItemRequest request, CancellationToken cancellationToken)
        {
            var result = await _Uow.ReturnItem.Update(request.Id, ri =>
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
