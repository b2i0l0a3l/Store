using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetReturnItemByIdRequest : IRequest<Result<ReturnItemModel>>
    {
        public int Id { get; set; }
    }
}
