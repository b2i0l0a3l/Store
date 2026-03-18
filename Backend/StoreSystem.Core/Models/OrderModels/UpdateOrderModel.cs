using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.enums;

namespace StoreSystem.Core.Models
{
    public class UpdateOrderModel
    {
        public int OrderId { get; set; }
        public int? ClientId { get; set; }
        public enOrderType OrderType { get; set; }
        public enOrderStatus OrderStatus { get; set; }
    }
}