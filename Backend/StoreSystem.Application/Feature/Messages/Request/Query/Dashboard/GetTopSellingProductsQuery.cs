using System.Collections.Generic;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models.DashboardModels;

namespace StoreSystem.Application.Feature.Messages.Request.Query.Dashboard
{
    public class GetTopSellingProductsQuery : IRequest<Result<IEnumerable<TopSellingProductModel>>>
    {
    }
}
