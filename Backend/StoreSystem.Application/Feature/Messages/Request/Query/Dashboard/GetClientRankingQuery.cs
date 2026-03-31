using System.Collections.Generic;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models.ClientModels;

namespace StoreSystem.Application.Feature.Messages.Request.Query.Dashboard
{
    public class GetClientRankingQuery : IRequest<Result<IEnumerable<ClientRankingModel>>>
    {
    }
}
