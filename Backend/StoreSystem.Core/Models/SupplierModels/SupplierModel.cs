using StoreSystem.Core.Entities;

namespace StoreSystem.Core.Models
{
    public record SupplierModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }

        public static SupplierModel FromEntity(Supplier entity) => new()
        {
            Id = entity.Id,
            Name = entity.Name,
            PhoneNumber = entity.PhoneNumber
        };
    }
}
