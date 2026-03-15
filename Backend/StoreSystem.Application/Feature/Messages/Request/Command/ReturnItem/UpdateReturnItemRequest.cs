using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class UpdateReturnItemRequest : IRequest<Result<bool>>
    {
        public int Id { get; set; }
        public int ReturnId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
