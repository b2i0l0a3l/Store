using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetReturnByIdHandler : IRequestHandler<GetReturnByIdRequest, Result<ReturnModel>>
    {
        private readonly IRepository<Return> _Repo;
        public GetReturnByIdHandler(IRepository<Return> repo) => _Repo = repo;

        public async Task<Result<ReturnModel>> Handle(GetReturnByIdRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetById(request.Id,
                projection: r => new ReturnModel(r.Id, r.OrderId, r.TotalRefund, r.CreatedAt));
        }
    }
}
