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
    public class DeleteDebtHandler : IRequestHandler<DeleteDebtRequest, Result<bool>>
    {
        private readonly IRepository<Debt> _Repo;

        public DeleteDebtHandler(IRepository<Debt> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(DeleteDebtRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Delete(request.Id);
            return result;
        }
    }
}
