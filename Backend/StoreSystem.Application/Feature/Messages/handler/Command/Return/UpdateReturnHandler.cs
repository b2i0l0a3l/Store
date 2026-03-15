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
        private readonly IRepository<ReturnEntity> _Repo;

        public UpdateReturnHandler(IRepository<ReturnEntity> repo)
        {
            _Repo = repo;
        }

        public async Task<Result<bool>> Handle(UpdateReturnRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Update(request.Id, r =>
            {
                r.OrderId = request.OrderId;
                r.TotalRefund = request.TotalRefund;
            });

            return result;
        }
    }
}
