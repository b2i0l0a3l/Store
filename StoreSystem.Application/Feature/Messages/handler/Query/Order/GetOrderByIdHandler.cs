using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetOrderByIdHandler : IRequestHandler<GetOrderByIdRequest, Result<OrderCardModel>>
    {
        private readonly IGetOrderCardFunction _Repo;
        public GetOrderByIdHandler(IGetOrderCardFunction repo)
        {
            _Repo = repo;
        }
        public async Task<Result<OrderCardModel>> Handle(GetOrderByIdRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetResultAsync(request.Id);
        }
    }
}
