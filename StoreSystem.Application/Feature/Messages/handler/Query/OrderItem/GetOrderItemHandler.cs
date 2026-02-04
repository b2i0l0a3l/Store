using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetOrderItemHandler : IRequestHandler<GetOrderItemsRequest, Result<PagedResult<OrderItemModel>>>
    {
        private readonly IRepository<OrderItem> _Repo;
        private readonly IMapper _Mapper;
        public GetOrderItemHandler(IRepository<OrderItem> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }
        public async Task<Result<PagedResult<OrderItemModel>>> Handle(GetOrderItemsRequest request, CancellationToken cancellationToken)
        {
            Result<PagedResult<OrderItem>?> result = await _Repo.GetAll(request.PageNumber, request.PageSize);
            if (!result.IsSuccess) return result.Error!;

            PagedResult<OrderItemModel> records = new()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Items = result.Value!.Items.Select(x => _Mapper.Map<OrderItemModel>(x)),
                TotalItems = result.Value.TotalItems,
            };

            return records;
        }
    }
}
