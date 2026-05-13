using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetPaymentByIdHandler : IRequestHandler<GetPaymentByIdRequest, Result<PaymentModel>>
    {
        private readonly IRepository<Payment> _Repo;
        public GetPaymentByIdHandler(IRepository<Payment> repo) => _Repo = repo;

        public async Task<Result<PaymentModel>> Handle(GetPaymentByIdRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetById(request.Id,
                projection: p => new PaymentModel(p.Id, p.DebtID, p.Amount, p.PaidAt));
        }
    }
}
