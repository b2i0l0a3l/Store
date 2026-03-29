using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllClientsHandler : IRequestHandler<GetAllClientsRequest, Result<IEnumerable<ClientModel>>>
    {
        private readonly IRepository<Client> _repo;

        public GetAllClientsHandler(IRepository<Client> repo)
        {
            _repo = repo;
        }

        public async Task<Result<IEnumerable<ClientModel>>> Handle(GetAllClientsRequest request, CancellationToken cancellationToken)
        {
            var result = await _repo.All();
            if (!result.IsSuccess) return result.Error!;

            var records = result.Value!.Select(x => ClientModel.FromEntity(x));
            return Result<IEnumerable<ClientModel>>.Success(records);
        }
    }
}
