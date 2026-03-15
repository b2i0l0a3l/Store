using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetSupplierProductByIdRequest : IRequest<Result<SupplierProductModel>>
    {
        public int Id { get; set; }
    }
}
