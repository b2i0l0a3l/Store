using StoreSystem.Core.Entities;

namespace StoreSystem.Core.Models
{
    public record CategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public static CategoryModel FromEntity(Category entity) => new()
        {
            Id = entity.Id,
            Name = entity.Name
        };
    }
}
