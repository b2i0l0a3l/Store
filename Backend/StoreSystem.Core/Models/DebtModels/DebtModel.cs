namespace StoreSystem.Core.Models
{
    public record DebtModel(int Id, int OrderId, int ClientId, decimal Remaining, DateTime CreatedAt, DateTime UpdatedAt);
}
