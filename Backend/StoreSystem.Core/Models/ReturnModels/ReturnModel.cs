using StoreSystem.Core.Entities;

namespace StoreSystem.Core.Models
{
    public record ReturnModel
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public decimal TotalRefund { get; set; }
        public DateTime CreatedAt { get; set; }

        public static ReturnModel FromEntity(Return entity) => new()
        {
            Id = entity.Id,
            OrderId = entity.OrderId,
            TotalRefund = entity.TotalRefund,
            CreatedAt = entity.CreatedAt
        };
    }
}
