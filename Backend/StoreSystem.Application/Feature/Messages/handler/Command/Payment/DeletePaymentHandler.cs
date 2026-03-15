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
    public class DeletePaymentHandler : IRequestHandler<DeletePaymentRequest, Result<bool>>
    {
        private readonly IRepository<PaymentEntity> _Repo;

        public DeletePaymentHandler(IRepository<PaymentEntity> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(DeletePaymentRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.Delete(request.Id);
        }
    }
}

