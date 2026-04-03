using System;

namespace StoreSystem.Core.Models.DashboardModels
{
    public class SalesOverTimeModel
    {
        public DateTime SaleDate { get; set; }
        public decimal TotalSales { get; set; }
        public decimal TotalDebt { get; set; }
    }
}
