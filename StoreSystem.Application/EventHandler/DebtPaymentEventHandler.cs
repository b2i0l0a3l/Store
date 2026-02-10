using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.enums;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.EventHandler
{
    public class DebtPaymentEventHandler : INotificationHandler<EventNotification<DebtPaymentEvent>>
    {
        private readonly IUniteOfWork _Uow;

        public DebtPaymentEventHandler(IUniteOfWork Uow)
        {
            _Uow = Uow;
        }

        public async Task Handle(EventNotification<DebtPaymentEvent> notification, CancellationToken cancellationToken)
        {
            var debtResult = await _Uow.Debt.GetById(notification.Event.DebtId);
            if (debtResult.Value == null)
                throw new Exception($"Debt with Id {notification.Event.DebtId} not found");

            Debt debt = debtResult.Value;
            decimal amount = notification.Event.Amount;

            if (amount > debt.Remaining)
                throw new Exception($"Payment amount ({amount}) exceeds remaining debt ({debt.Remaining})");

            Payment payment = new()
            {
                DebtID = debt.Id,
                Amount = amount,
                PaidAt = DateTime.UtcNow
            };
            await _Uow.Payment.Add(payment);

            decimal newRemaining = debt.Remaining - amount;
            await _Uow.Debt.Update(debt.Id, d => d.Remaining = newRemaining);

            if (newRemaining == 0)
            {
                await _Uow.Order.Update(debt.OrderId, o => o.OrderStatus = enOrderStatus.Paid);
            }
            else
            {
                await _Uow.Order.Update(debt.OrderId, o => o.OrderStatus = enOrderStatus.Partial);
            }
        }
    }
}
