using StoreSystem.Core.interfaces;

namespace StoreSystem.Core.Events
{
    public class AdjustDebtForReturnEvent : ICoreEvent
    {
        public DateTime OccurredOn { get; } = DateTime.UtcNow;
        public int OrderId { get; }
        public decimal ReturnAmount { get; }

        public AdjustDebtForReturnEvent(int orderId, decimal returnAmount)
        {
            OrderId = orderId;
            ReturnAmount = returnAmount;
        }
    }
}
