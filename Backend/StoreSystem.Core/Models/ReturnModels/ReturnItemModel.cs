namespace StoreSystem.Core.Models
{
    public record ReturnItemModel(int Id, int ReturnId, int ProductId, int Quantity, decimal Price, DateTime CreatedAt);
}
