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
    public class GetLowStockAlertsHandler : IRequestHandler<GetLowStockAlertsQuery, Result<IEnumerable<LowStockProductModel>>>
    {
        private readonly IFnLowStockAlertsFunction _lowStockAlertsFunc;

        public GetLowStockAlertsHandler(IFnLowStockAlertsFunction lowStockAlertsFunc)
        {
            _lowStockAlertsFunc = lowStockAlertsFunc;
        }

        public async Task<Result<IEnumerable<LowStockProductModel>>> Handle(GetLowStockAlertsQuery request, CancellationToken cancellationToken)
        {
            var result = await _lowStockAlertsFunc.Handle();
            
            if (!result.IsSuccess) return result.Error!;

            return result;
        }
    }
}
