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
        private readonly IQueryService<Client> _query;
        public GetClientByIdHandler(IQueryService<Client> query) => _query = query;

        public async Task<Result<ClientModel>> Handle(GetClientByIdRequest request, CancellationToken cancellationToken)
        {
            return await _query.FindById(request.Id, c => new ClientModel(c.Id, c.Name!, c.PhoneNumber, c.Address));
        }
    }
}
