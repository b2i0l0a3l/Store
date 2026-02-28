using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query.Order;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query.Order
{
    public class GetOrderItemsByOrderIdHandler : IRequestHandler<GetOrderItemsByOrderIdRequest, Result<PagedResult<OrderItemFunctionModel>>>
    {
        private readonly IGetOrderItemFunction _repo;
        public GetOrderItemsByOrderIdHandler(IGetOrderItemFunction repo)
        {
            _repo = repo;
        }
        public async Task<Result<PagedResult<OrderItemFunctionModel>>> Handle(GetOrderItemsByOrderIdRequest request, CancellationToken cancellationToken)
        {
            return await _repo.GetOrderItemByOrderIdAsync(request.PageNumber,request.PageSize,request.OrderId);
        }
    }
}