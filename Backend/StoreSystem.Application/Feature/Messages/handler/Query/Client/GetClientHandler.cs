using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetClientHandler : IRequestHandler<GetClientsRequest, Result<PagedResult<ClientModel>>>
    {
        private readonly IQueryService<Client> _query;
        public GetClientHandler(IQueryService<Client> query) => _query = query;

        public async Task<Result<PagedResult<ClientModel>>> Handle(GetClientsRequest request, CancellationToken cancellationToken)
        {
            return await _query.GetPaged(request.PageNumber, request.PageSize, c => new ClientModel(c.Id, c.Name!, c.PhoneNumber, c.Address));
        }
    }
}
