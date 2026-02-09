using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Common
{
    public class EventNotification<TEvent>  : INotification where TEvent : ICoreEvent
    {
        public TEvent Event { get; }
        public EventNotification(TEvent @event) { Event = @event; }

    }
}