using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using PaymentEntity = StoreSystem.Core.Entities.Payment;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class UpdatePaymentHandler : IRequestHandler<UpdatePaymentRequest, Result<bool>>
    {
        private readonly IRepository<PaymentEntity> _Repo;

        public UpdatePaymentHandler(IRepository<PaymentEntity> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(UpdatePaymentRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Update(request.Id, p =>
            {
                p.DebtID = request.DebtID;
                p.Amount = request.Amount;
            });

            return result;
        }
    }
}

