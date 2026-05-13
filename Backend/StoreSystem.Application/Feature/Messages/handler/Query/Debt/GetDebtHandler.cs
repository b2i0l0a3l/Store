using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetDebtHandler : IRequestHandler<GetDebtsRequest, Result<PagedResult<DebtModel>>>
    {
        private readonly IRepository<Debt> _Repo;
        public GetDebtHandler(IRepository<Debt> Repo) => _Repo = Repo;

        public async Task<Result<PagedResult<DebtModel>>> Handle(GetDebtsRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetAll(request.PageNumber, request.PageSize,
                projection: d => new DebtModel(d.Id, d.OrderId, d.ClientId, d.Remaining, d.CreatedAt, d.UpdatedAt));
        }
    }
}
