using System;

namespace StoreSystem.Core.Models.DashboardModels
{
    public class TopSellingProductModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal TotalSoldAmount { get; set; }
        public int TotalSoldQuantity { get; set; }
    }
}
