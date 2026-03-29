using StoreSystem.Core.Entities;

namespace StoreSystem.Core.Models
{
    public record ClientModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }

        public static ClientModel FromEntity(Client entity) => new()
        {
            Id = entity.Id,
            Name = entity.Name ?? string.Empty,
            PhoneNumber = entity.PhoneNumber
        };
    }
}
