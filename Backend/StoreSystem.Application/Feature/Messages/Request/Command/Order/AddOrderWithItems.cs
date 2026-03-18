using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Command.Order
{
    public class AddOrderWithItemsRequest : IRequest<Result>
    {
        public int ClientId { get; set; }
        public enOrderType OrderType { get; set; } = enOrderType.Sell;
        public required List<OrderItemList> Items { get; set; }
    }
}