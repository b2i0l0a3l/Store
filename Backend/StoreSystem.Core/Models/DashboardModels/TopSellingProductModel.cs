using System;

namespace StoreSystem.Core.Models.DashboardModels
{
    public class TopSellingProductModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal TotalSoldAmount { get; set; }
        public int TotalSoldQuantity { get; set; }
    }
}
