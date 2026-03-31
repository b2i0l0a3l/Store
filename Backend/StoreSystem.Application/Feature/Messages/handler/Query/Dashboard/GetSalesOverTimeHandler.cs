using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces.functions.OrderFunctions;
using StoreSystem.Core.Models.DashboardModels;
using StoreSystem.Application.Feature.Messages.Request.Query.Dashboard;

namespace StoreSystem.Application.Feature.Messages.handler.Query.Dashboard
{
    public class GetSalesOverTimeHandler : IRequestHandler<GetSalesOverTimeQuery, Result<IEnumerable<SalesOverTimeModel>>>
    {
        private readonly IFnSalesOverTimeFunction _salesOverTimeFunc;

        public GetSalesOverTimeHandler(IFnSalesOverTimeFunction salesOverTimeFunc)
        {
            _salesOverTimeFunc = salesOverTimeFunc;
        }

        public async Task<Result<IEnumerable<SalesOverTimeModel>>> Handle(GetSalesOverTimeQuery request, CancellationToken cancellationToken)
        {
            var result = await _salesOverTimeFunc.Handle(request.Days);
            
            if (!result.IsSuccess) return result.Error!;

            return result;
        }
    }
}
