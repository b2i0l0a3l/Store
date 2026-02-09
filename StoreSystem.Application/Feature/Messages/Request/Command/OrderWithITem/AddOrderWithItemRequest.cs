using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;

namespace StoreSystem.Application.Feature.Messages.Request.Command.OrderWithITem
{
    public class AddOrderWithItemRequest : IRequest<Result>
    {
        public int ClientId { get; set; }
        public enOrderType OrderType { get; set; }
        public required List<OrderItemList> OrderItem { get; set; }
    }
    public class OrderItemList{
        public int? OrderId { get; set; }
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}