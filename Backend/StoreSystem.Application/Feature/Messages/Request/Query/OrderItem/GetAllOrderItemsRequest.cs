using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public record GetAllOrderItemsRequest : IRequest<Result<IEnumerable<OrderItemModel>>>;
}
