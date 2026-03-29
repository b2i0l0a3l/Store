using StoreSystem.Core.Entities;

namespace StoreSystem.Core.Models
{
    public record ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } 
        public decimal Cost { get; set; }
        public int CategoryId { get; set; }

        public static ProductModel FromEntity(Product entity) => new()
        {
            Id = entity.Id,
            Name = entity.Name,
            Price = entity.Price,
            Cost = entity.Cost,
            CategoryId = entity.CategoryId
        };
    }
}