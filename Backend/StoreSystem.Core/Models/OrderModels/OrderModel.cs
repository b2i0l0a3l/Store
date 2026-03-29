using StoreSystem.Core.Entities;
using StoreSystem.Core.enums;

namespace StoreSystem.Core.Models
{
    public record OrderModel
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public decimal Total { get; set; }    
        public enOrderStatus OrderStatus { get; set; }
        public enOrderType OrderType { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 

        public static OrderModel FromEntity(Order entity) => new()
        {
            Id = entity.Id,
            ClientId = entity.ClientId ?? 0,
            Total = entity.Total,
            OrderStatus = entity.OrderStatus,
            OrderType = entity.OrderType,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt
        };
    }
}
