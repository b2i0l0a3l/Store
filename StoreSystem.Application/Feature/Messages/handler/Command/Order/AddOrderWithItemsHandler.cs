using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command.Order;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command.Order
{
    public class AddOrderWithItemsHandler : IRequestHandler<AddOrderWithItemsRequest, Result>
    {
        private readonly IHandleOrderWithHisItemsProcedure _Repo;
        public AddOrderWithItemsHandler(IHandleOrderWithHisItemsProcedure rep)
        {
            _Repo = rep;
        }
        public async Task<Result> Handle(AddOrderWithItemsRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.handle(request.Request);
        }
    }
}