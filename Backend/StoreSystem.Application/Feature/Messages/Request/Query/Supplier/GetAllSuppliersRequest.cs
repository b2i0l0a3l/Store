using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public record GetAllSuppliersRequest : IRequest<Result<IEnumerable<SupplierModel>>>;
}
