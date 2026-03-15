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
    public class GetReturnItemsHandler : IRequestHandler<GetReturnItemsRequest, Result<PagedResult<ReturnItemModel>>>
    {
        private readonly IRepository<ReturnItem> _Repo;
        private readonly IMapper _Mapper;

        public GetReturnItemsHandler(IRepository<ReturnItem> repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        public async Task<Result<PagedResult<ReturnItemModel>>> Handle(GetReturnItemsRequest request, CancellationToken cancellationToken)
        {
            Result<PagedResult<ReturnItem>?> result = await _Repo.GetAll(request.PageNumber, request.PageSize);
            if (!result.IsSuccess) return result.Error!;

            PagedResult<ReturnItemModel> records = new()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Items = result.Value!.Items.Select(x => _Mapper.Map<ReturnItemModel>(x)),
                TotalItems = result.Value.TotalItems,
            };

            return records;
        }
    }
}
