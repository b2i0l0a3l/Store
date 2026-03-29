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
        private readonly IRepository<Client> _Repo;
        public GetClientHandler(IRepository<Client> Repo)
        {
            _Repo = Repo;
        }
        public async Task<Result<PagedResult<ClientModel>>> Handle(GetClientsRequest request, CancellationToken cancellationToken)
        {
            Result<PagedResult<Client>?> result = await _Repo.GetAll(request.PageNumber, request.PageSize);
            if (!result.IsSuccess) return result.Error!;

            PagedResult<ClientModel> records = new()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Items = result.Value!.Items.Select(x => ClientModel.FromEntity(x)),
                TotalItems = result.Value.TotalItems,
            };

            return records;
        }
    }
}
