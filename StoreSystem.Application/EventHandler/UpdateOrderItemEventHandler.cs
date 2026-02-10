using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.EventHandler
{
    public class UpdateOrderItemEventHandler : INotificationHandler<EventNotification<UpdateOrderItemEvent>>
    {
        private readonly IUniteOfWork _Uow;

        public UpdateOrderItemEventHandler(IUniteOfWork Uow)
        {
            _Uow = Uow;
        }

        public async Task Handle(EventNotification<UpdateOrderItemEvent> notification, CancellationToken cancellationToken)
        {
            var ev = notification.Event;

            var itemResult = await _Uow.OrderItem.GetByCondition(
                x => x.OrderId == ev.OrderId && x.ProductId == ev.ProductId);
            if (itemResult.Value == null)
                throw new Exception($"OrderItem for Product {ev.ProductId} in Order {ev.OrderId} not found");

            OrderItem orderItem = itemResult.Value;
            int newQuantity = orderItem.Quantity - ev.ReturnQuantity;

            if (newQuantity == 0)
            {
                await _Uow.OrderItem.Delete(orderItem.Id);
            }
            else
            {
                await _Uow.OrderItem.Update(orderItem.Id, x => x.Quantity = newQuantity);
            }
        }
    }
}
