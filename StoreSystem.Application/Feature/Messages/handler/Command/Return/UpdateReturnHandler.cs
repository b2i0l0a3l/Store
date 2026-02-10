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
    public class UpdateReturnHandler : IRequestHandler<UpdateReturnRequest, Result<bool>>
    {
        private readonly IUniteOfWork _Uow;

        public UpdateReturnHandler(IUniteOfWork uow)
        {
            _Uow = uow;
        }

        public async Task<Result<bool>> Handle(UpdateReturnRequest request, CancellationToken cancellationToken)
        {
            var result = await _Uow.Return.Update(request.Id, r =>
            {
                r.OrderId = request.OrderId;
                r.ClientId = request.ClientId;
                r.TotalRefund = request.TotalRefund;
            });

            return result;
        }
    }
}
