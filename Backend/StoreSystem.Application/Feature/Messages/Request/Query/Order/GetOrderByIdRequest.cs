using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetOrderByIdRequest : IRequest<Result<OrderCardModel>>
    {
        public int Id { get; set; }
    }
}
