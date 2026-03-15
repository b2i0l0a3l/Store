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
    public class AddOrderHandler : IRequestHandler<AddOrderRequest, Result<OrderModel>>
    {
        private readonly IRepository<Core.Entities.Order> _Repo;
        private readonly IMapper _Mapper;

        public AddOrderHandler(IRepository<Core.Entities.Order> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }

        public async Task<Result<OrderModel>> Handle(AddOrderRequest request, CancellationToken cancellationToken)
        {
            var order = new Core.Entities.Order
            {
                ClientId = request.ClientId ?? null,
                Total = request.Total
            };

            var result = await _Repo.Add(order);
            if (!result.IsSuccess) return result.Error!;

            return _Mapper.Map<OrderModel>(result.Value);
        }
    }
}
