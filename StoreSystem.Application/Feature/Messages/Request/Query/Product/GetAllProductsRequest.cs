using System.Collections.Generic;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;
using StoreSystem.Core.Models.ProductModels;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetAllProductsRequest : IRequest<Result<IEnumerable<GetAllProductModel>>>
    {
    }
}
