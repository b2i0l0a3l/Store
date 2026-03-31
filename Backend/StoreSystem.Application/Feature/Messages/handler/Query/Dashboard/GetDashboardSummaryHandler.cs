using System.Threading;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces.functions.OrderFunctions;
using StoreSystem.Core.interfaces.functions.ProductFunctions;
using StoreSystem.Core.interfaces.functions.DebtFunctions;
using StoreSystem.Core.Models.DashboardModels;
using StoreSystem.Application.Feature.Messages.Request.Query.Dashboard;

namespace StoreSystem.Application.Feature.Messages.handler.Query.Dashboard
{
    public class GetDashboardSummaryHandler : IRequestHandler<GetDashboardSummaryQuery, Result<DashboardSummaryDto>>
    {
        private readonly IGetOrdersCountFunction _ordersCountFunc;
        private readonly IGetProductCountFunction _productCountFunc;
        private readonly IGetTotalOrdersFunction _totalOrdersFunc;
        private readonly IGetTotalRemainingFunction _totalRemainingFunc;

        public GetDashboardSummaryHandler(
            IGetOrdersCountFunction ordersCountFunc,
            IGetProductCountFunction productCountFunc,
            IGetTotalOrdersFunction totalOrdersFunc,
            IGetTotalRemainingFunction totalRemainingFunc)
        {
            _ordersCountFunc = ordersCountFunc;
            _productCountFunc = productCountFunc;
            _totalOrdersFunc = totalOrdersFunc;
            _totalRemainingFunc = totalRemainingFunc;
        }

        public async Task<Result<DashboardSummaryDto>> Handle(GetDashboardSummaryQuery request, CancellationToken cancellationToken)
        {
            var ordersCountResult = await _ordersCountFunc.Handle();
            if (!ordersCountResult.IsSuccess) return ordersCountResult.Error!;

            var productCountResult = await _productCountFunc.Handle();
            if (!productCountResult.IsSuccess) return productCountResult.Error!;

            var totalOrdersResult = await _totalOrdersFunc.Handle();
            if (!totalOrdersResult.IsSuccess) return totalOrdersResult.Error!;

            var totalRemainingResult = await _totalRemainingFunc.Handle();
            if (!totalRemainingResult.IsSuccess) return totalRemainingResult.Error!;

            var dto = new DashboardSummaryDto
            {
                TotalOrders = ordersCountResult.Value,
                TotalProducts = productCountResult.Value,
                TotalRevenue = totalOrdersResult.Value,
                TotalRemainingDebt = totalRemainingResult.Value
            };

            return dto;
        }
    }
}
