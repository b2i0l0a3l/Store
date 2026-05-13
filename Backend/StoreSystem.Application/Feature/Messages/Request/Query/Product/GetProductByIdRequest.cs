using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public record GetProductByIdRequest(int Id) : IRequest<Result<ProductModel>>;
}
