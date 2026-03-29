using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddPaymentHandler : IRequestHandler<AddPaymentRequest, Result>
    {
        private readonly IAddPaymentProcedure _Repo;

        public AddPaymentHandler(IAddPaymentProcedure Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result> Handle(AddPaymentRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Handle(new AddPaymentModel{Amount = request.Amount, DebtId= request.DebtId});
            return result;
        }
    }
}
