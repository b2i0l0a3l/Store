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
using ReturnEntity = StoreSystem.Core.Entities.Return;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetReturnsHandler : IRequestHandler<GetReturnsRequest, Result<PagedResult<ReturnModel>>>
    {
        private readonly IRepository<ReturnEntity> _Repo;
        private readonly IMapper _Mapper;

        public GetReturnsHandler(IRepository<ReturnEntity> repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        public async Task<Result<PagedResult<ReturnModel>>> Handle(GetReturnsRequest request, CancellationToken cancellationToken)
        {
            Result<PagedResult<ReturnEntity>?> result = await _Repo.GetAll(request.PageNumber, request.PageSize);
            if (!result.IsSuccess) return result.Error!;

            PagedResult<ReturnModel> records = new()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Items = result.Value!.Items.Select(x => _Mapper.Map<ReturnModel>(x)),
                TotalItems = result.Value.TotalItems,
            };

            return records;
        }
    }
}
