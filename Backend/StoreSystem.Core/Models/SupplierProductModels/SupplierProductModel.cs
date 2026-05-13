namespace StoreSystem.Core.Models
{
    public record SupplierProductModel(int Id, int ProductId, int SupplierId, int Quantity, decimal CostPrice, DateTime CreatedAt);
}
