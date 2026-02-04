using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _Mapper;
        public GetClientHandler(IRepository<Client> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }
        public async Task<Result<PagedResult<ClientModel>>> Handle(GetClientsRequest request, CancellationToken cancellationToken)
        {
            Result<PagedResult<Client>?> result = await _Repo.GetAll(request.PageNumber, request.PageSize);
            if (!result.IsSuccess) return result.Error!;

            PagedResult<ClientModel> records = new()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Items = result.Value!.Items.Select(x => _Mapper.Map<ClientModel>(x)),
                TotalItems = result.Value.TotalItems,
            };

            return records;
        }
    }
}
