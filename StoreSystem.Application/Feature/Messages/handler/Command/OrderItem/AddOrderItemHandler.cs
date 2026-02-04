using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddOrderItemHandler : IRequestHandler<AddOrderItemRequest, Result<OrderItemModel>>
    {
        private readonly IRepository<OrderItem> _Repo;
        private readonly IMapper _Mapper;

        public AddOrderItemHandler(IRepository<OrderItem> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }

        public async Task<Result<OrderItemModel>> Handle(AddOrderItemRequest request, CancellationToken cancellationToken)
        {
            var orderItem = new OrderItem
            {
                ProductId = request.ProductId,
                Price = request.Price
            };

            var result = await _Repo.Add(orderItem);
            if (!result.IsSuccess) return result.Error!;

            return _Mapper.Map<OrderItemModel>(result.Value);
        }
    }
}
