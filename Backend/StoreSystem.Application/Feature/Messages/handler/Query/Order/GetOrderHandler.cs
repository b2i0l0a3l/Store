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
    public class GetOrderHandler : IRequestHandler<GetOrdersRequest, Result<PagedResult<OrderModel>>>
    {
        private readonly IRepository<Core.Entities.Order> _Repo;
        public GetOrderHandler(IRepository<Core.Entities.Order> Repo)
        {
            _Repo = Repo;
        }
        public async Task<Result<PagedResult<OrderModel>>> Handle(GetOrdersRequest request, CancellationToken cancellationToken)
        {
            Result<PagedResult<Core.Entities.Order>?> result = await _Repo.GetAll(request.PageNumber, request.PageSize);
            if (!result.IsSuccess) return result.Error!;

            PagedResult<OrderModel> records = new()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Items = result.Value!.Items.Select(x => OrderModel.FromEntity(x)),
                TotalItems = result.Value.TotalItems,
            };

            return records;
        }
    }
}
