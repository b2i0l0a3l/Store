using StoreSystem.Core.Entities;

namespace StoreSystem.Core.Models
{
    public record SupplierProductModel
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int SupplierId { get; set; }
        public int Quantity { get; set; }
        public decimal CostPrice { get; set; }
        public DateTime CreatedAt { get; set; }

        public static SupplierProductModel FromEntity(SupplierProduct entity) => new()
        {
            Id = entity.Id,
            ProductId = entity.ProductId,
            SupplierId = entity.SupplierId,
            Quantity = entity.Quantity,
            CostPrice = entity.CostPrice,
            CreatedAt = entity.CreatedAt
        };
    }
}

