namespace StoreSystem.Core.Models
{
    public record OrderItemModel(int Id, int ProductId, decimal Price, int Quantity);
}
