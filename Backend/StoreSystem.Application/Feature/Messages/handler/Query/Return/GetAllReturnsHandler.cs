using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using ReturnEntity = StoreSystem.Core.Entities.Return;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllReturnsHandler : IRequestHandler<GetAllReturnsRequest, Result<IEnumerable<ReturnModel>>>
    {
        private readonly IQueryService<ReturnEntity> _query;
        public GetAllReturnsHandler(IQueryService<ReturnEntity> query) => _query = query;

        public async Task<Result<IEnumerable<ReturnModel>>> Handle(GetAllReturnsRequest request, CancellationToken cancellationToken)
        {
            var result = await _query.GetAll(r => new ReturnModel(r.Id, r.OrderId, r.TotalRefund, r.CreatedAt));
            if (!result.IsSuccess) return result.Error!;
            return Result<IEnumerable<ReturnModel>>.Success(result.Value!);
        }
    }
}
