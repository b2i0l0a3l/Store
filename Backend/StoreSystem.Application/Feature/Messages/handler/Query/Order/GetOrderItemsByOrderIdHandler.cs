using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query.Order;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.interfaces.functions.OrderFunctions;
using StoreSystem.Core.Models;
using StoreSystem.Core.Models.OrderItemModels;

namespace StoreSystem.Application.Feature.Messages.handler.Query.Order
{
    public class GetOrderItemsByOrderIdHandler : IRequestHandler<GetOrderItemsByOrderIdRequest, Result<IEnumerable<GetOrderItemFunctionModel>>>
    {
        private readonly IGetOrderItemsByOrderIdFunc _repo;
        public GetOrderItemsByOrderIdHandler(IGetOrderItemsByOrderIdFunc repo)
        {
            _repo = repo;
        }
        public async Task<Result<IEnumerable<GetOrderItemFunctionModel>>> Handle(GetOrderItemsByOrderIdRequest request, CancellationToken cancellationToken)
        {
            return await _repo.GetResultAsync(request.OrderId);
        }
    }
}