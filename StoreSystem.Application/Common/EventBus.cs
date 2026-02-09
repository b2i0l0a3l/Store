using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Interface;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Common
{
    public class EventBus : IEventBus
    {
        private readonly IMediator _mediator;

        public EventBus(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task Publish<TEvent>(TEvent @event) where TEvent : ICoreEvent
        {
            await _mediator.Publish(new EventNotification<TEvent>(@event));
        }

    }
}