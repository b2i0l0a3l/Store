using StoreSystem.Core.Entities;

namespace StoreSystem.Core.Models
{
    public record ReturnItemModel
    {
        public int Id { get; set; }
        public int ReturnId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; }

        public static ReturnItemModel FromEntity(ReturnItem entity) => new()
        {
            Id = entity.Id,
            ReturnId = entity.ReturnId,
            ProductId = entity.ProductId,
            Quantity = entity.Quantity,
            Price = entity.Price,
            CreatedAt = entity.CreatedAt
        };
    }
}
