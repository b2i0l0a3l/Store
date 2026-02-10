using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetClientByIdRequest : IRequest<Result<ClientModel>>
    {
        public int Id { get; set; }
    }
}
