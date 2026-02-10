using StoreSystem.Core.interfaces;

namespace StoreSystem.Core.Events
{
    public class UpdateOrderItemEvent : ICoreEvent
    {
        public DateTime OccurredOn { get; } = DateTime.UtcNow;
        public int OrderId { get; }
        public int ProductId { get; }
        public int ReturnQuantity { get; }

        public UpdateOrderItemEvent(int orderId, int productId, int returnQuantity)
        {
            OrderId = orderId;
            ProductId = productId;
            ReturnQuantity = returnQuantity;
        }
    }
}
