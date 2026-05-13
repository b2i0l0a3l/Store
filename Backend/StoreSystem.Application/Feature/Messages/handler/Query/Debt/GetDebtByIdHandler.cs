using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetDebtByIdHandler : IRequestHandler<GetDebtByIdRequest, Result<DebtModel>>
    {
        private readonly IRepository<Debt> _Repo;
        public GetDebtByIdHandler(IRepository<Debt> repo) => _Repo = repo;

        public async Task<Result<DebtModel>> Handle(GetDebtByIdRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetById(request.Id,
                projection: d => new DebtModel(d.Id, d.OrderId, d.ClientId, d.Remaining, d.CreatedAt, d.UpdatedAt));
        }
    }
}
