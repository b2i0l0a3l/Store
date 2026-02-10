using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Core.Events
{
    public class ReturnOrderItemEvent : ICoreEvent
    {
        public DateTime OccurredOn { get; } = DateTime.UtcNow;
        public int OrderId { get; }
        public int ProductId { get; }
        public int Quantity { get; }

        public ReturnOrderItemEvent(int orderId, int productId, int quantity)
        {
            OrderId = orderId;
            ProductId = productId;
            Quantity = quantity;
        }
    }
}
