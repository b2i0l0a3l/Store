using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Core.Events
{
    public class DebtPaymentEvent : ICoreEvent
    {
        public DateTime OccurredOn { get; } = DateTime.UtcNow;
        public int DebtId { get; }
        public decimal Amount { get; }

        public DebtPaymentEvent(int debtId, decimal amount)
        {
            DebtId = debtId;
            Amount = amount;
        }
    }
}
