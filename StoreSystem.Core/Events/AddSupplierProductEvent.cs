using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Core.Events
{
    public class AddSupplierProductEvent : ICoreEvent
    {
        public DateTime OccurredOn { get; } = DateTime.UtcNow;
        public int SupplierId { get; }
        public int ProductId { get; }
        public int Quantity { get; }
        public decimal CostPrice { get; }

        public AddSupplierProductEvent(int supplierId, int productId, int quantity, decimal costPrice)
        {
            SupplierId = supplierId;
            ProductId = productId;
            Quantity = quantity;
            CostPrice = costPrice;
        }
    }
}
