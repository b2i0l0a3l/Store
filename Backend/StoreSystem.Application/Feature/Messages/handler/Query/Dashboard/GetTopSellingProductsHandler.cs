using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces.functions.ProductFunctions;
using StoreSystem.Core.Models.DashboardModels;
using StoreSystem.Application.Feature.Messages.Request.Query.Dashboard;

namespace StoreSystem.Application.Feature.Messages.handler.Query.Dashboard
{
    public class GetTopSellingProductsHandler : IRequestHandler<GetTopSellingProductsQuery, Result<IEnumerable<TopSellingProductModel>>>
    {
        private readonly IFnTopSellingProductsFunction _topSellingProductsFunc;

        public GetTopSellingProductsHandler(IFnTopSellingProductsFunction topSellingProductsFunc)
        {
            _topSellingProductsFunc = topSellingProductsFunc;
        }

        public async Task<Result<IEnumerable<TopSellingProductModel>>> Handle(GetTopSellingProductsQuery request, CancellationToken cancellationToken)
        {
            var result = await _topSellingProductsFunc.Handle();
            
            if (!result.IsSuccess) return result.Error!;

            return result;
        }
    }
}
