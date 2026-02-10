using StoreSystem.Core.interfaces;

namespace StoreSystem.Core.Events
{
    public class UpdateOrderTotalEvent : ICoreEvent
    {
        public DateTime OccurredOn { get; } = DateTime.UtcNow;
        public int OrderId { get; }
        public decimal Amount { get; }

        public UpdateOrderTotalEvent(int orderId, decimal amount)
        {
            OrderId = orderId;
            Amount = amount;
        }
    }
}
