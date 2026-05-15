using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetPaymentsHandler : IRequestHandler<GetPaymentsRequest, Result<PagedResult<PaymentModel>>>
    {
        private readonly IQueryService<Payment> _query;
        public GetPaymentsHandler(IQueryService<Payment> query) => _query = query;

        public async Task<Result<PagedResult<PaymentModel>>> Handle(GetPaymentsRequest request, CancellationToken cancellationToken)
        {
            return await _query.GetPaged(request.PageNumber, request.PageSize,
                p => new PaymentModel(p.Id, p.DebtID, p.Amount, p.PaidAt));
        }
    }
}
