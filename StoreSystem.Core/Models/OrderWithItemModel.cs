using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.enums;

namespace StoreSystem.Core.Models
{
    public class OrderWithItemModel
    {
        public int Client_Id{ get; set; }
        public enOrderType OrderType { get; set; } = enOrderType.Sell;
        public required List<OrderItemList> Items{ get; set; }
    }
    public class OrderItemList{
        public int productId { get; set; }
        public int quantity { get; set; }
        public decimal price { get; set; }
    }
}