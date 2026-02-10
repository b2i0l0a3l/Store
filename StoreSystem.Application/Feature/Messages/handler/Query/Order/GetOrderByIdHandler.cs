using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetOrderByIdHandler : IRequestHandler<GetOrderByIdRequest, Result<OrderModel>>
    {
        private readonly IRepository<Order> _Repo;
        private readonly IMapper _Mapper;

        public GetOrderByIdHandler(IRepository<Order> repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        public async Task<Result<OrderModel>> Handle(GetOrderByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.GetById(request.Id);
            if (!result.IsSuccess || result.Value == null)
                return new Error("NotFound", Core.enums.ErrorType.General, $"Order with Id {request.Id} not found");

            return _Mapper.Map<OrderModel>(result.Value);
        }
    }
}
