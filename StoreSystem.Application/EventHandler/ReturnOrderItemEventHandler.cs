using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.enums;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;
using ReturnEntity = StoreSystem.Core.Entities.Return;

namespace StoreSystem.Application.EventHandler
{
    public class ReturnOrderItemEventHandler : INotificationHandler<EventNotification<ReturnOrderItemEvent>>
    {
        private readonly IUniteOfWork _Uow;
        private readonly IMediator _Mediator;

        public ReturnOrderItemEventHandler(IUniteOfWork Uow, IMediator mediator)
        {
            _Uow = Uow;
            _Mediator = mediator;
        }

        public async Task Handle(EventNotification<ReturnOrderItemEvent> notification, CancellationToken cancellationToken)
        {
            int orderId = notification.Event.OrderId;
            int productId = notification.Event.ProductId;
            int returnQty = notification.Event.Quantity;

            var orderResult = await _Uow.Order.GetById(orderId);
            if (orderResult.Value == null)
                throw new Exception($"Order with Id {orderId} not found");

            Order order = orderResult.Value;

            var itemResult = await _Uow.OrderItem.GetByCondition(
                x => x.OrderId == orderId && x.ProductId == productId);
            if (itemResult.Value == null)
                throw new Exception($"OrderItem for Product {productId} in Order {orderId} not found");

            OrderItem orderItem = itemResult.Value;

            if (returnQty > orderItem.Quantity)
                throw new Exception($"Return quantity ({returnQty}) exceeds order item quantity ({orderItem.Quantity})");

            decimal returnAmount = orderItem.Price * returnQty;

            var returnRecord = new ReturnEntity
            {
                OrderId = orderId,
                ClientId = order.ClientId,
                TotalRefund = returnAmount,
                CreatedAt = DateTime.UtcNow
            };
            var returnResult = await _Uow.Return.Add(returnRecord);
            await _Uow.SaveAsync();

            if (returnResult.Value != null)
            {
                await _Mediator.Publish(new EventNotification<AddReturnItemEvent>(
                    new AddReturnItemEvent(returnResult.Value.Id, productId, returnQty, orderItem.Price)));
            }

            await _Mediator.Publish(new EventNotification<UpdateOrderItemEvent>(
                new UpdateOrderItemEvent(orderId, productId, returnQty)));

            await _Mediator.Publish(new EventNotification<RestoreProductStockEvent>(
                new RestoreProductStockEvent(productId, returnQty)));

            await _Mediator.Publish(new EventNotification<UpdateOrderTotalEvent>(
                new UpdateOrderTotalEvent(orderId, returnAmount)));

            if (order.OrderType == enOrderType.Debt)
            {
                await _Mediator.Publish(new EventNotification<AdjustDebtForReturnEvent>(
                    new AdjustDebtForReturnEvent(orderId, returnAmount)));
            }
        }
    }
}
