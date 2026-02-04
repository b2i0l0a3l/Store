using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddPaymentHandler : IRequestHandler<AddPaymentRequest, Result<PaymentModel>>
    {
        private readonly IRepository<Payment> _Repo;
        private readonly IMapper _Mapper;

        public AddPaymentHandler(IRepository<Payment> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }

        public async Task<Result<PaymentModel>> Handle(AddPaymentRequest request, CancellationToken cancellationToken)
        {
            var payment = new Payment
            {
                DebtID = request.DebtID,
                Amount = request.Amount,
                PaidAt = DateTime.UtcNow
            };

            var result = await _Repo.Add(payment);
            if (!result.IsSuccess) return result.Error!;

            return _Mapper.Map<PaymentModel>(result.Value);
        }
    }
}
