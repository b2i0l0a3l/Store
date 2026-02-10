using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Command.OrderWithITem
{
    public class AddOrderWithItemRequest : IRequest<Result>
    {
        public int ClientId { get; set; }
        public enOrderType OrderType { get; set; }
        public required List<OrderItemList> OrderItem { get; set; }
    }
    
}