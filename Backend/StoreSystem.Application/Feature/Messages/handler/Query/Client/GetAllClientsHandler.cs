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
        public GetAllClientsHandler(IRepository<Client> repo) => _repo = repo;

        public async Task<Result<IEnumerable<ClientModel>>> Handle(GetAllClientsRequest request, CancellationToken cancellationToken)
        {
            return await _repo.All(
                projection: c => new ClientModel(c.Id, c.Name, c.PhoneNumber, c.Address));
        }
    }
}
