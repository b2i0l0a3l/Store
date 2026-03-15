using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models.OrderItemModels
{
    public class GetOrderItemByOrderIdModel
    {
        public int Id { get; set; }
        public string? ClientName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public DateTime CreateAd { get; set; }
    }
}