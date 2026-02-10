using StoreSystem.Core.interfaces;

namespace StoreSystem.Core.Events
{
    public class RestoreProductStockEvent : ICoreEvent
    {
        public DateTime OccurredOn { get; } = DateTime.UtcNow;
        public int ProductId { get; }
        public int Quantity { get; }

        public RestoreProductStockEvent(int productId, int quantity)
        {
            ProductId = productId;
            Quantity = quantity;
        }
    }
}
