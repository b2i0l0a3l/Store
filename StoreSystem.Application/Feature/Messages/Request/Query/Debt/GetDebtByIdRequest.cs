using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetDebtByIdRequest : IRequest<Result<DebtModel>>
    {
        public int Id { get; set; }
    }
}
