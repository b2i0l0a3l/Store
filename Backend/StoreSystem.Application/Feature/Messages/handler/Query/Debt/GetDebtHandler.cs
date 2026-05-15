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
        private readonly IQueryService<Debt> _query;
        public GetDebtHandler(IQueryService<Debt> query) => _query = query;

        public async Task<Result<PagedResult<DebtModel>>> Handle(GetDebtsRequest request, CancellationToken cancellationToken)
        {
            return await _query.GetPaged(request.PageNumber, request.PageSize,
                d => new DebtModel(d.Id, d.OrderId, d.ClientId, d.Remaining, d.CreatedAt, d.UpdatedAt));
        }
    }
}
