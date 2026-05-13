namespace StoreSystem.Core.Models
{
    public record ProductModel(int Id, string Name, decimal Price, decimal Cost, int CategoryId, string? ImagePath);
}
