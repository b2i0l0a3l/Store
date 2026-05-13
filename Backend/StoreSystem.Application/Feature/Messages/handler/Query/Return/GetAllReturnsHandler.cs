using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;
using ReturnEntity = StoreSystem.Core.Entities.Return;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllReturnsHandler : IRequestHandler<GetAllReturnsRequest, Result<IEnumerable<ReturnEntity>>>
    {
        private readonly IRepository<ReturnEntity> _repo;

        public GetAllReturnsHandler(IRepository<ReturnEntity> repo)
        {
            _repo = repo;
        }

        public async Task<Result<IEnumerable<ReturnEntity>>> Handle(GetAllReturnsRequest request, CancellationToken cancellationToken)
        {
            var result = await _repo.All(
                projection: r => new ReturnEntity { Id = r.Id, OrderId = r.OrderId, TotalRefund = r.TotalRefund, CreatedAt = r.CreatedAt });
            if (!result.IsSuccess) return result.Error!;
            return Result<IEnumerable<ReturnEntity>>.Success(result.Value!);
        }
    }
}
