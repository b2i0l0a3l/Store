using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetOrderItemByIdRequest : IRequest<Result<OrderItemModel>>
    {
        public int Id { get; set; }
    }
}
