using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.EventHandler
{
    public class RestoreProductStockEventHandler : INotificationHandler<EventNotification<RestoreProductStockEvent>>
    {
        private readonly IUniteOfWork _Uow;

        public RestoreProductStockEventHandler(IUniteOfWork Uow)
        {
            _Uow = Uow;
        }

        public async Task Handle(EventNotification<RestoreProductStockEvent> notification, CancellationToken cancellationToken)
        {
            await _Uow.Product.Update(notification.Event.ProductId, p => p.Quantity += notification.Event.Quantity);
        }
    }
}
