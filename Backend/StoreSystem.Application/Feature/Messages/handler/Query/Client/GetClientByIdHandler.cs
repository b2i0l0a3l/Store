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

        public GetClientByIdHandler(IRepository<Client> repo)
        {
            _Repo = repo;
        }

        public async Task<Result<ClientModel>> Handle(GetClientByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.GetById(request.Id);
            if (!result.IsSuccess || result.Value == null)
                return new Error("NotFound", Core.enums.ErrorType.General, $"Client with Id {request.Id} not found");

            return ClientModel.FromEntity(result.Value);
        }
    }
}
