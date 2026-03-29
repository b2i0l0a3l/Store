using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddClientHandler : IRequestHandler<AddClientRequest, Result<ClientModel>>
    {
        private readonly IRepository<Client> _Repo;

        public AddClientHandler(IRepository<Client> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<ClientModel>> Handle(AddClientRequest request, CancellationToken cancellationToken)
        {
            var client = new Client
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber
            };

            var result = await _Repo.Add(client);
            if (!result.IsSuccess) return result.Error!;

            return ClientModel.FromEntity(result.Value!);
        }
    }
}
