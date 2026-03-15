using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetProductByIdRequest : IRequest<Result<ProductModel>>
    {
        public int Id { get; set; }
    }
}
