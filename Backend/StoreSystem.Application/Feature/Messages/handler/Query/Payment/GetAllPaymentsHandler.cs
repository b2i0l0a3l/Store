using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.interfaces.functions.PaymentFunctions;
using StoreSystem.Core.Models;
using StoreSystem.Core.Models.PaymentModels;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllPaymentsHandler : IRequestHandler<GetAllPaymentsRequest, Result<IEnumerable<GetAllPaymentModel>>>
    {
        private readonly IFnGetAllPaymentsFunction _repo;
        public GetAllPaymentsHandler(IFnGetAllPaymentsFunction repo)
        {
            _repo = repo;        }

        public async Task<Result<IEnumerable<GetAllPaymentModel>>> Handle(GetAllPaymentsRequest request, CancellationToken cancellationToken)
        {
            var result = await _repo.Handle();
            if (!result.IsSuccess) return result.Error!;
            return result;
        }
    }
}
