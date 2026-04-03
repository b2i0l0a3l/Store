using System;

namespace StoreSystem.Core.Models.DashboardModels
{
    public class RecentOrderModel
    {
        public int OrderId { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public DateTime InsertedDate { get; set; }
    }
}
