using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.EventHandler
{
    public class UpdateOrderWithItemEventHandler : INotificationHandler<EventNotification<UpdateOrderWithItemEvent>>
    {
        private readonly IUniteOfWork _Uow;
        private readonly IMapper _Mapper;
        public UpdateOrderWithItemEventHandler(IMapper mapper,IUniteOfWork uow)
        {
            _Uow = uow;
            _Mapper = mapper;
        }
        public async Task Handle(EventNotification<UpdateOrderWithItemEvent> notification, CancellationToken cancellationToken)
        {
            List<OrderItem> existingItems = new();
            List<OrderItem> notExistingItems = new();
            int OrderId = notification.Event.Order.Id;
            foreach (OrderItemList item in notification.Event.OrderItems)
            {
                item.OrderId = OrderId;
                Result<OrderItem?> res = await _Uow.OrderItem.GetByCondition(x => x.ProductId == item.ProductId && x.OrderId == OrderId);
                await _Uow.Product.Update(item.ProductId, x => x.Quantity -= item.Quantity);
                if (res.Value != null)
                {
                    res.Value.Quantity += item.Quantity;
                    existingItems.Add(res.Value);
                    continue;
                }
                notExistingItems.Add(_Mapper.Map<OrderItem>(item));
            }

            if (existingItems.Any())
            {
                await _Uow.OrderWithItemRepo.UpdateRange(existingItems);
            }
            if (notExistingItems.Any())
            {
                await _Uow.OrderWithItemRepo.AddRange(notExistingItems);
            }
            decimal T1 = notExistingItems.Sum(x => x.Price * x.Quantity);
            decimal T2 = existingItems.Sum(x => x.Price * x.Quantity);
            decimal Total = notification.Event.Order.Total + T1 + T2;
            await _Uow.Order.Update(OrderId, x => x.Total = Total);

        }
    }
}