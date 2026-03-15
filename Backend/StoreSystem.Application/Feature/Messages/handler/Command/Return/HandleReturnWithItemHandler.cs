using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command.Return;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command.Return
{
    public class HandleReturnWithItemHandler : IRequestHandler<AddReturnWithItemsRequest, Result>
    {
        private readonly IHandleReturnProcedure _rep;
        public HandleReturnWithItemHandler(IHandleReturnProcedure r)
        {
            _rep = r;
        }
        public async Task<Result> Handle(AddReturnWithItemsRequest request, CancellationToken cancellationToken)
        {
            var result = await _rep.handle(request.returnWithItemModel);
            return result;
        }
    }
}