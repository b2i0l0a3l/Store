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
        private readonly IQueryService<Debt> _query;
        public GetDebtByIdHandler(IQueryService<Debt> query) => _query = query;

        public async Task<Result<DebtModel>> Handle(GetDebtByIdRequest request, CancellationToken cancellationToken)
        {
            return await _query.FindById(request.Id,
                d => new DebtModel(d.Id, d.OrderId, d.ClientId, d.Remaining, d.CreatedAt, d.UpdatedAt));
        }
    }
}
