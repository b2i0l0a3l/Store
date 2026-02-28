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
    public class UpdateDebtHandler : IRequestHandler<UpdateDebtRequest, Result<bool>>
    {
        private readonly IRepository<Debt> _Repo;

        public UpdateDebtHandler(IRepository<Debt> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(UpdateDebtRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Update(request.Id, d =>
            {
                d.OrderId = request.OrderId;
                d.ClientId = request.ClientId;
                d.Remaining = request.Remaining;
                d.UpdatedAt = DateTime.UtcNow;
            });
            return result;
        }
    }
}
