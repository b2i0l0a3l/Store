using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using ReturnEntity = StoreSystem.Core.Entities.Return;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class DeleteReturnHandler : IRequestHandler<DeleteReturnRequest, Result<bool>>
    {
        private readonly IUniteOfWork _Uow;

        public DeleteReturnHandler(IUniteOfWork uow)
        {
            _Uow = uow;
        }

        public async Task<Result<bool>> Handle(DeleteReturnRequest request, CancellationToken cancellationToken)
        {
            return await _Uow.Return.Delete(request.Id);
        }
    }
}
