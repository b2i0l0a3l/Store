using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Core.Events
{
    public class AddReturnItemEvent : ICoreEvent
    {
        public int ReturnId { get; }
        public int ProductId { get; }
        public int Quantity { get; }
        public decimal Price { get; }
        public DateTime OccurredOn { get; } = DateTime.UtcNow;

        public AddReturnItemEvent(int returnId , int productId , int quanity,decimal price)
        {
            ReturnId = returnId;
            ProductId = productId;
            Quantity = quanity;
            Price = price;
        }
    }
}