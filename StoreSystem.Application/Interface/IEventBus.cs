using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Interface
{
    public interface IEventBus
    {
        Task Publish<TEvent>(TEvent @event) where TEvent : ICoreEvent;
    }
}