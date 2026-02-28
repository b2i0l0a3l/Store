using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public class ReturnWithItemModel
    {
        public int OrderId { get; set; }
        public required List<ReturnWithItemModel> Items { get; set; }
    }
    public class ReturnItemList
    {
        public int productId { get; set; }
        public int quantity { get; set; }
        public decimal price { get; set; }
        public int orderItemId { get; set; }
    }
}