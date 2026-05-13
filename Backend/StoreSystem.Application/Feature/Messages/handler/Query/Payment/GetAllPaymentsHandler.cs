using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllPaymentsHandler : IRequestHandler<GetAllPaymentsRequest, Result<IEnumerable<PaymentModel>>>
    {
        private readonly IRepository<Payment> _repo;
        public GetAllPaymentsHandler(IRepository<Payment> repo) => _repo = repo;

        public async Task<Result<IEnumerable<PaymentModel>>> Handle(GetAllPaymentsRequest request, CancellationToken cancellationToken)
        {
            return await _repo.All(
                projection: p => new PaymentModel(p.Id, p.DebtID, p.Amount, p.PaidAt));
        }
    }
}
