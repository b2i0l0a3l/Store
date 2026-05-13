using MediatR;
using StoreSystem.Core.common;

namespace StoreSystem.Application.Feature.Messages.Request.Command
{
    public record AddProductRequest : IRequest<Result<int>>
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Cost { get; set; }
        public int CategoryId { get; set; }
        public string? ImagePath { get; set; }
        public string? CodeBar { get; set; }
        public int Quantity { get; set; }
    }
}
