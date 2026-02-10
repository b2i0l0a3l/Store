using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Application.Feature.Messages.Request.Command.Payment;
using StoreSystem.Core.common;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command.Payment
{
    public class MakePaymentHandler : IRequestHandler<MakePaymentRequest, Result>
    {
        private readonly IUniteOfWork _Uow;
        private readonly IMediator _Mediator;

        public MakePaymentHandler(IUniteOfWork uow, IMediator mediator)
        {
            _Uow = uow;
            _Mediator = mediator;
        }

        public async Task<Result> Handle(MakePaymentRequest request, CancellationToken cancellationToken)
        {
            await _Uow.BeginTransactionAsync(cancellationToken);
            try
            {
                var debtResult = await _Uow.Debt.GetById(request.DebtId);
                if (debtResult.Value == null)
                    return Result.Failure(new Error("DebtNotFound", Core.enums.ErrorType.General, $"Debt with Id {request.DebtId} not found"));

                if (request.Amount <= 0)
                    return Result.Failure(new Error("InvalidAmount", Core.enums.ErrorType.General, "Payment amount must be greater than 0"));

                if (request.Amount > debtResult.Value.Remaining)
                    return Result.Failure(new Error("AmountExceedsDebt", Core.enums.ErrorType.General, $"Payment amount ({request.Amount}) exceeds remaining debt ({debtResult.Value.Remaining})"));

                var debtPaymentEvent = new DebtPaymentEvent(request.DebtId, request.Amount);
                await _Mediator.Publish(new EventNotification<DebtPaymentEvent>(debtPaymentEvent), cancellationToken);

                await _Uow.CommitAsync(cancellationToken);
                return Result.Success();
            }
            catch (Exception ex)
            {
                await _Uow.RollbackAsync(cancellationToken);
                return Result.Failure(new Error("MakePaymentError", Core.enums.ErrorType.General, ex.Message));
            }
        }
    }
}
