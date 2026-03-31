using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetOrderItemHandler : IRequestHandler<GetOrderItemsRequest, Result<PagedResult<OrderItemWithTotalCount>>>
    {
        private readonly IGetOrderItemPagination _itemFunction;
        public GetOrderItemHandler(IGetOrderItemPagination itemFunction)
        {
            _itemFunction = itemFunction;
        }
        public async Task<Result<PagedResult<OrderItemWithTotalCount>>> Handle(GetOrderItemsRequest request, CancellationToken cancellationToken)
        {
            return await _itemFunction.handle(request.PageNumber, request.PageSize);
        }
    }
}
