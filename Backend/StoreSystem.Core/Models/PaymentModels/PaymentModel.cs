namespace StoreSystem.Core.Models
{
    public record PaymentModel(int Id, int DebtID, decimal Amount, DateTime PaidAt);
}
