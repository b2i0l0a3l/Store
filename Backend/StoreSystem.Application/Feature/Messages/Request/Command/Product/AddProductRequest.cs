using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public class AddProductRequest : IRequest<Result<ProductModel>>
    {
        public string Name { get; set; } = string.Empty;
        public string? CodeBar { get; set; }
        public string? ImagePath { get; set; }
        public decimal Price { get; set; }
        public decimal Cost { get; set; }
        public int Quantity { get; set; }
        public int CategoryId { get; set; }
    }
}
