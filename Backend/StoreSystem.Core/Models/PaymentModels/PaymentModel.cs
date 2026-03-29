using StoreSystem.Core.Entities;

namespace StoreSystem.Core.Models
{
    public record PaymentModel
    {
        public int Id { get; set; }
        public int DebtID { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaidAt { get; set; }

        public static PaymentModel FromEntity(Payment entity) => new()
        {
            Id = entity.Id,
            DebtID = entity.DebtID,
            Amount = entity.Amount,
            PaidAt = entity.PaidAt
        };
    }
}
