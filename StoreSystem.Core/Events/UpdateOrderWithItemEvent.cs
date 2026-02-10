using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Core.Events
{
    public class UpdateOrderWithItemEvent : ICoreEvent
    {
        public DateTime OccurredOn { get; } = DateTime.UtcNow;
        public List<OrderItemList> OrderItems { get; }
        public Order Order { get; }
    
        public UpdateOrderWithItemEvent(Order order,List<OrderItemList> OrderItem)
        {
            Order = order;
            OrderItems = OrderItem;
        }

    }
}