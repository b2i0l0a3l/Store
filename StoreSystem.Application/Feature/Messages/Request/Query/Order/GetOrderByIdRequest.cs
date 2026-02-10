using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetOrderByIdRequest : IRequest<Result<OrderModel>>
    {
        public int Id { get; set; }
    }
}
