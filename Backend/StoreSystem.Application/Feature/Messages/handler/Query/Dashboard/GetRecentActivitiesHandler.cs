using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces.functions.OrderFunctions;
using StoreSystem.Core.interfaces.functions.PaymentFunctions;
using StoreSystem.Core.Models.DashboardModels;
using StoreSystem.Application.Feature.Messages.Request.Query.Dashboard;

namespace StoreSystem.Application.Feature.Messages.handler.Query.Dashboard
{
    public class GetRecentActivitiesHandler : IRequestHandler<GetRecentActivitiesQuery, Result<RecentActivitiesDto>>
    {
        private readonly IFnRecentOrdersFunction _recentOrdersFunc;
        private readonly IFnRecentPaymentsFunction _recentPaymentsFunc;

        public GetRecentActivitiesHandler(IFnRecentOrdersFunction recentOrdersFunc, IFnRecentPaymentsFunction recentPaymentsFunc)
        {
            _recentOrdersFunc = recentOrdersFunc;
            _recentPaymentsFunc = recentPaymentsFunc;
        }

        public async Task<Result<RecentActivitiesDto>> Handle(GetRecentActivitiesQuery request, CancellationToken cancellationToken)
        {
            var dto = new RecentActivitiesDto();

            var ordersResult = await _recentOrdersFunc.Handle();
            if (ordersResult.IsSuccess)
            {
                dto.RecentOrders = ordersResult.Value!;
            }

            var paymentsResult = await _recentPaymentsFunc.Handle();
            if (paymentsResult.IsSuccess)
            {
                dto.RecentPayments = paymentsResult.Value!;
            }

            return dto;
        }
    }
}
