using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.interfaces.functions;
using StoreSystem.Core.Models;
using StoreSystem.Core.Models.DebtModels;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllDebtsHandler : IRequestHandler<GetAllDebtsRequest, Result<IEnumerable<GetDebtModel>>>
    {
        private readonly IGetDebts _repo;

        public GetAllDebtsHandler(IGetDebts repo)
        {
            _repo = repo;
        }

        public async Task<Result<IEnumerable<GetDebtModel>>> Handle(GetAllDebtsRequest request, CancellationToken cancellationToken)
        {
            return await _repo.GetResultAsync();
        }
    }
}
