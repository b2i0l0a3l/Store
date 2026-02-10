using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.enums;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.EventHandler
{
    public class AdjustDebtForReturnEventHandler : INotificationHandler<EventNotification<AdjustDebtForReturnEvent>>
    {
        private readonly IUniteOfWork _Uow;

        public AdjustDebtForReturnEventHandler(IUniteOfWork Uow)
        {
            _Uow = Uow;
        }

        public async Task Handle(EventNotification<AdjustDebtForReturnEvent> notification, CancellationToken cancellationToken)
        {
            var debtResult = await _Uow.Debt.GetByCondition(d => d.OrderId == notification.Event.OrderId);
            if (debtResult.Value == null)
                return;

            Debt debt = debtResult.Value;
            decimal newRemaining = debt.Remaining - notification.Event.ReturnAmount;
            if (newRemaining < 0) newRemaining = 0;

            await _Uow.Debt.Update(debt.Id, d => d.Remaining = newRemaining);

            if (newRemaining == 0)
            {
                await _Uow.Order.Update(notification.Event.OrderId, o => o.OrderStatus = enOrderStatus.Paid);
            }
        }
    }
}
