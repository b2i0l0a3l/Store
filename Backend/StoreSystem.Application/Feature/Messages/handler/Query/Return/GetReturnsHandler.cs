using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetReturnsHandler : IRequestHandler<GetReturnsRequest, Result<PagedResult<ReturnModel>>>
    {
        private readonly IRepository<Return> _Repo;
        public GetReturnsHandler(IRepository<Return> repo) => _Repo = repo;

        public async Task<Result<PagedResult<ReturnModel>>> Handle(GetReturnsRequest request, CancellationToken cancellationToken)
        {
            Result<PagedResult<ReturnModel>?> pagedResult = await _Repo.GetAll(request.PageNumber, request.PageSize,
                projection: r => new ReturnModel(r.Id, r.OrderId, r.TotalRefund, r.CreatedAt));
            if (!pagedResult.IsSuccess || pagedResult.Value == null)
                return pagedResult.Error!;
            return pagedResult!;
        }
    }
}
