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

namespace StoreSystem.Application.EventHandler
{
    public class AddOrderItemEventHandler : INotificationHandler<EventNotification<AddOrderWithItemEvent>>
    {
        private readonly IUniteOfWork _Uow;
        private readonly IMediator _Mediator;
        private IMapper _Mapper;
        public AddOrderItemEventHandler(IMediator Mediator,IMapper mapper,IUniteOfWork uow)
        {
            _Mediator = Mediator;
            _Uow = uow;
            _Mapper = mapper;
        }
        public async Task Handle(EventNotification<AddOrderWithItemEvent> notification, CancellationToken cancellationToken)
        {

            Result<Order> result = await _Uow.Order.Add(new Order { ClientId = notification.Event.ClientId, Total = 0, OrderType = notification.Event.OrderType });
            await _Uow.SaveAsync();
            if (result.Value != null)
            {
                List<OrderItem> orderItems = notification.Event.ItemList.Select(x =>
                {
                    x.OrderId = result.Value.Id;
                    return _Mapper.Map<OrderItem>(x);
                }).ToList();

                await _Uow.OrderWithItemRepo.AddRange(orderItems);
                decimal Total = orderItems.Sum(x => x.Price * x.Quantity);
                await _Uow.Order.Update(result.Value.Id, x => x.Total = Total);
                if (notification.Event.OrderType == Core.enums.enOrderType.Debt)
                {
                    var req = new DebtEventArgs(result.Value.Id, result.Value.ClientId, result.Value.Total);
                    await _Mediator.Publish(new EventNotification<DebtEventArgs>(req));
                }
            }
        }
    }
}