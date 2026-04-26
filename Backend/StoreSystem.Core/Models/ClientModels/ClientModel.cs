using StoreSystem.Core.Entities;

namespace StoreSystem.Core.Models
{
    public record ClientModel
    {
        public int Id { get; set; }
        public string Name { get; init; } = string.Empty;
        public string? PhoneNumber { get; init; }
        public string? Address { get; init; }

        public static ClientModel FromEntity(Client entity) => new()
        {
            Id = entity.Id,
            Name = entity.Name ?? string.Empty,
            PhoneNumber = entity.PhoneNumber,
            Address = entity.Address
        };
    }
}
