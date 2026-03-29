using StoreSystem.Core.Entities;

namespace StoreSystem.Core.Models
{
    public record DebtModel
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public decimal Remaining { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public static DebtModel FromEntity(Debt entity) => new()
        {
            Id = entity.Id,
            OrderId = entity.OrderId,
            ClientId = entity.ClientId,
            Remaining = entity.Remaining,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt
        };
    }
}
