using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.enums;

namespace StoreSystem.Core.Models
{
    public record AddPaymentModel
    {
        public int DebtId { get; init; }
        public decimal Amount { get; init; }
                public string? Notes { get; init; }  
        public enPaymentMethod PaymentMethod { get; init; } = enPaymentMethod.Cash;

    }
}