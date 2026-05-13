using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetClientByIdHandler : IRequestHandler<GetClientByIdRequest, Result<ClientModel>>
    {
        private readonly IRepository<Client> _Repo;
        public GetClientByIdHandler(IRepository<Client> repo) => _Repo = repo;

        public async Task<Result<ClientModel>> Handle(GetClientByIdRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.GetById(request.Id,
                projection: c => new ClientModel(c.Id, c.Name, c.PhoneNumber, c.Address));
        }
    }
}
