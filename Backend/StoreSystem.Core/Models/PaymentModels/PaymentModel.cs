using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public record PaymentModel
    {
        public int Id { get; set; }
        public int DebtID { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaidAt { get; set; }
    }
}
