using System.Collections.Generic;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;
using StoreSystem.Core.Models.DebtModels;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetAllDebtsRequest : IRequest<Result<IEnumerable<GetDebtModel>>>
    {
    }
}
