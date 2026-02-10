using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.EventHandler
{
    public class UpdateOrderTotalEventHandler : INotificationHandler<EventNotification<UpdateOrderTotalEvent>>
    {
        private readonly IUniteOfWork _Uow;

        public UpdateOrderTotalEventHandler(IUniteOfWork Uow)
        {
            _Uow = Uow;
        }

        public async Task Handle(EventNotification<UpdateOrderTotalEvent> notification, CancellationToken cancellationToken)
        {
            var orderResult = await _Uow.Order.GetById(notification.Event.OrderId);
            if (orderResult.Value == null)
                throw new Exception($"Order with Id {notification.Event.OrderId} not found");

            decimal newTotal = orderResult.Value.Total - notification.Event.Amount;
            if (newTotal < 0) newTotal = 0;

            await _Uow.Order.Update(notification.Event.OrderId, o => o.Total = newTotal);
        }
    }
}
