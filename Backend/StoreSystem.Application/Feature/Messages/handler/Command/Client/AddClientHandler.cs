using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddClientHandler : IRequestHandler<AddClientRequest, Result<int>>
    {
        private readonly IRepository<Client> _Repo;

        public AddClientHandler(IRepository<Client> repo)
        {
            _Repo = repo;
        }

        public async Task<Result<int>> Handle(AddClientRequest request, CancellationToken cancellationToken)
        {
            var client = new Client
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address
            };

            var result = await _Repo.Add(client);
            return result;
        }
    }
}
