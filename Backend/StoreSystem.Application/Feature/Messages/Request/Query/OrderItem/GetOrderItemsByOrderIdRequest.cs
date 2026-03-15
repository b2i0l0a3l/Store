using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;
using StoreSystem.Core.Models.OrderItemModels;

namespace StoreSystem.Application.Feature.Messages.Request.Query.Order
{
    public class GetOrderItemsByOrderIdRequest : IRequest<Result<IEnumerable<GetOrderItemByOrderIdModel>>>
    {
        public int OrderId { get; set; }
    }
}