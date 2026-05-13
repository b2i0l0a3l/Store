namespace StoreSystem.Core.Models
{
    public record ReturnModel(int Id, int OrderId, decimal TotalRefund, DateTime CreatedAt);
}
