using System;

namespace StoreSystem.Core.Models.DashboardModels
{
    public class LowStockProductModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
    }
}
