using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces.functions.ClientFunctions;
using StoreSystem.Core.Models.ClientModels;
using StoreSystem.Application.Feature.Messages.Request.Query.Dashboard;

namespace StoreSystem.Application.Feature.Messages.handler.Query.Dashboard
{
    public class GetClientRankingHandler : IRequestHandler<GetClientRankingQuery, Result<IEnumerable<ClientRankingModel>>>
    {
        private readonly IFnClientRankingFunction _clientRankingFunc;

        public GetClientRankingHandler(IFnClientRankingFunction clientRankingFunc)
        {
            _clientRankingFunc = clientRankingFunc;
        }

        public async Task<Result<IEnumerable<ClientRankingModel>>> Handle(GetClientRankingQuery request, CancellationToken cancellationToken)
        {
            var result = await _clientRankingFunc.Handle();
            
            if (!result.IsSuccess || result.Value == null)
                return result.Error!;

            return result;
        }
    }
}
