using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Core.Events
{
    public class DebtEventArgs : ICoreEvent
    {
        public int OrderId { get; }
        public int ClientId { get; }
        public DateTime OccurredOn { get; } = DateTime.UtcNow;

        public DebtEventArgs(int orderId, int clientId)
        {
            OrderId = orderId;
            ClientId = clientId;
        }

    }
}