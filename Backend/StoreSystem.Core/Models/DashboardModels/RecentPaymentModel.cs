using System;

namespace StoreSystem.Core.Models.DashboardModels
{
    public class RecentPaymentModel
    {
        public int PaymentId { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime InsertDate { get; set; }
    }
}
