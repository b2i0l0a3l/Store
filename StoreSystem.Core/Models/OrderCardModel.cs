using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public class OrderCardModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Totat { get; set; }
        public decimal Remaining { get; set; }
        public string OrderType { get; set; } = string.Empty;
        public string OrderStatus { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 
    }
}