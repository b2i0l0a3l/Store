using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class UpdateProductRequest : IRequest<Result<bool>>
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Cost { get; set; }
        public int CategoryId { get; set; }
    }
}
