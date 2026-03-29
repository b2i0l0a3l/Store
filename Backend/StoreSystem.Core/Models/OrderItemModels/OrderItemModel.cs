using StoreSystem.Core.Entities;

namespace StoreSystem.Core.Models
{
    public record OrderItemModel
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public static OrderItemModel FromEntity(OrderItem entity) => new()
        {
            Id = entity.Id,
            ProductId = entity.ProductId,
            Price = entity.Price,
            Quantity = entity.Quantity
        };
    }
}
