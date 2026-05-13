using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public record GetAllReturnsRequest : IRequest<Result<IEnumerable<Return>>>;
}
