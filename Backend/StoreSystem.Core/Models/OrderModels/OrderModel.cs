using StoreSystem.Core.enums;

namespace StoreSystem.Core.Models
{
    public record OrderModel(
        int Id,
        int ClientId,
string ClientName,
        decimal Total,
        enOrderStatus OrderStatus,
        enOrderType OrderType,
        DateTime CreatedAt,
        DateTime UpdatedAt
    );
}
