using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public class UpdateOrderItemModel
    {
        public int OrderItemId { get; set; }
        public int Quantity { get; set; }
        public int OrderId { get; set; }
        public decimal Price { get; set; }
        public int ProductId { get; set; }
    }
}