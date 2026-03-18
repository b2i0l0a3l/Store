using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class UpdateOrderRequest : IRequest<Result>
    {
         public int OrderId { get; set; }
        public int? ClientId { get; set; }
        public enOrderType OrderType { get; set; }
        public enOrderStatus OrderStatus { get; set; }
    }
}
