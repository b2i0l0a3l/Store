using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Core.Events
{
    public class AddOrderWithItemEvent : ICoreEvent
    {
        public DateTime OccurredOn { get; } = DateTime.UtcNow;
        public int ClientId { get; set; }
        public enOrderType OrderType { get; set; }
        public List<OrderItemList> ItemList { get; set; }
        public AddOrderWithItemEvent(int clientId , enOrderType orderType, List<OrderItemList> orderItemList)
        {
            ClientId = clientId;
            OrderType = orderType;
            ItemList = orderItemList;
        }
    }
}