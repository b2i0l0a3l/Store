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
    public class AddDebtEventHandler : INotificationHandler<EventNotification<DebtEventArgs>>
    {
        private readonly IUniteOfWork _Uow;
        public AddDebtEventHandler(IUniteOfWork Uow)
        {
            _Uow = Uow;
        }
        public async Task Handle(EventNotification<DebtEventArgs> notification, CancellationToken cancellationToken)
        {
            Debt debt = new()
            {
                ClientId = notification.Event.ClientId,
                OrderId = notification.Event.OrderId,
                Remaining = notification.Event.Reamaining
            };
            await _Uow.Debt.Add(debt);
        }
    }
}