using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetPaymentHandler : IRequestHandler<GetPaymentsRequest, Result<PagedResult<PaymentModel>>>
    {
        private readonly IRepository<Payment> _Repo;
        public GetPaymentHandler(IRepository<Payment> Repo) => _Repo = Repo;

        public async Task<Result<PagedResult<PaymentModel>>> Handle(GetPaymentsRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetAll(request.PageNumber, request.PageSize,
                projection: p => new PaymentModel(p.Id, p.DebtID, p.Amount, p.PaidAt));
        }
    }
}
