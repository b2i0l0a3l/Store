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
        private readonly IQueryService<Client> _query;
        public GetAllClientsHandler(IQueryService<Client> query) => _query = query;

        public async Task<Result<IEnumerable<ClientModel>>> Handle(GetAllClientsRequest request, CancellationToken cancellationToken)
        {
            var result = await _query.GetAll(c => new ClientModel(c.Id, c.Name!, c.PhoneNumber, c.Address));
            if (!result.IsSuccess) return result.Error!;
            return Result<IEnumerable<ClientModel>>.Success(result.Value!);
        }
    }
}
