using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetReturnByIdRequest : IRequest<Result<ReturnModel>>
    {
        public int Id { get; set; }
    }
}
