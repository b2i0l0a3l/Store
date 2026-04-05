using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models.PaymentModels
{
    public record GetAllPaymentModel
    {
        public int Id { get; set; }
        public int DebtId { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime PaidAt { get; set; }
    }
}