using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public class OrderItemFunctionModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Total { get; set; }
        public decimal Cost { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal Profit { get; set; }
        public int TotalCount { get; set; }
    }
}