using System.Threading;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces.functions.OrderFunctions;
using StoreSystem.Core.Models.DashboardModels;
using StoreSystem.Application.Feature.Messages.Request.Query.Dashboard;

namespace StoreSystem.Application.Feature.Messages.handler.Query.Dashboard
{
    public class GetCashVsDebtRatioHandler : IRequestHandler<GetCashVsDebtRatioQuery, Result<CashVsDebtRatioModel>>
    {
        private readonly IFnCashVsDebtRatioFunction _cashVsDebtRatioFunc;

        public GetCashVsDebtRatioHandler(IFnCashVsDebtRatioFunction cashVsDebtRatioFunc)
        {
            _cashVsDebtRatioFunc = cashVsDebtRatioFunc;
        }

        public async Task<Result<CashVsDebtRatioModel>> Handle(GetCashVsDebtRatioQuery request, CancellationToken cancellationToken)
        {
            var result = await _cashVsDebtRatioFunc.Handle();
            
            if (!result.IsSuccess || result.Value == null) return result.Error!;

            return result.Value;
        }
    }
}
