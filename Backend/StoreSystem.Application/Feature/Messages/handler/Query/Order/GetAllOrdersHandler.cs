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
using StoreSystem.Core.interfaces.functions.OrderFunctions;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllOrdersHandler : IRequestHandler<GetAllOrdersRequest, Result<IEnumerable<OrderCardModel>>>
    {
        private readonly IGetAllOrdersFunction _repo;

        public GetAllOrdersHandler(IGetAllOrdersFunction repo)
        {
            _repo = repo;
        }

        public async Task<Result<IEnumerable<OrderCardModel>>> Handle(GetAllOrdersRequest request, CancellationToken cancellationToken)
        {
            return await _repo.Handle();
        }
    }
}
