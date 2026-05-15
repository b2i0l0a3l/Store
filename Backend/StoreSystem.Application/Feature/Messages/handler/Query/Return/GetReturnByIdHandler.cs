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
        private readonly IQueryService<Return> _query;
        public GetReturnByIdHandler(IQueryService<Return> query) => _query = query;

        public async Task<Result<ReturnModel>> Handle(GetReturnByIdRequest request, CancellationToken cancellationToken)
        {
            return await _query.FindById(request.Id,
                r => new ReturnModel(r.Id, r.OrderId, r.TotalRefund, r.CreatedAt));
        }
    }
}
