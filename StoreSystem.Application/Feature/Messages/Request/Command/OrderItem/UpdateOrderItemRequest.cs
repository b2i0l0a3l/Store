using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class UpdateOrderItemRequest : IRequest<Result<bool>>
    {
        public int OrderId { get; set; }
        public int Id { get; set; }
        public int ProductId { get; set; }
        public decimal Price { get; set; }
    }
}
