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
    public class DeleteReturnItemHandler : IRequestHandler<DeleteReturnItemRequest, Result<bool>>
    {
        private readonly IUniteOfWork _Uow;

        public DeleteReturnItemHandler(IUniteOfWork uow)
        {
            _Uow = uow;
        }

        public async Task<Result<bool>> Handle(DeleteReturnItemRequest request, CancellationToken cancellationToken)
        {
            return await _Uow.ReturnItem.Delete(request.Id);
        }
    }
}
