using System.Collections.Generic;
using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.Models;
using StoreSystem.Core.Models.PaymentModels;

namespace StoreSystem.Application.Feature.Messages.Request.Query
{
    public class GetAllPaymentsRequest : IRequest<Result<IEnumerable<GetAllPaymentModel>>>
    {
    }
}
