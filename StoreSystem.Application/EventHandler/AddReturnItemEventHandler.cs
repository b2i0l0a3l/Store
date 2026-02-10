using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.Events;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.EventHandler
{
    public class AddReturnItemEventHandler : INotificationHandler<EventNotification<AddReturnItemEvent>>
    {
        private readonly IUniteOfWork _Uow;

        public AddReturnItemEventHandler(IUniteOfWork Uow)
        {
            _Uow = Uow;
        }
        public async Task Handle(EventNotification<AddReturnItemEvent> notification, CancellationToken cancellationToken)
        {
            AddReturnItemEvent ev = notification.Event;
            ReturnItem returnItem = new ()
            {
                ReturnId = ev.ReturnId,
                ProductId = ev.ProductId,
                Quantity = ev.Quantity,
                Price = ev.Price,
                CreatedAt = DateTime.UtcNow
            };
            await _Uow.ReturnItem.Add(returnItem);
        }
    }
}