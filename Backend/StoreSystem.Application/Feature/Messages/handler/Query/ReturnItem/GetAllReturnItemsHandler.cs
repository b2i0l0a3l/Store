using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
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
    public class GetAllReturnItemsHandler : IRequestHandler<GetAllReturnItemsRequest, Result<IEnumerable<ReturnItemModel>>>
    {
        private readonly IRepository<ReturnItem> _repo;
        private readonly IMapper _mapper;

        public GetAllReturnItemsHandler(IRepository<ReturnItem> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<Result<IEnumerable<ReturnItemModel>>> Handle(GetAllReturnItemsRequest request, CancellationToken cancellationToken)
        {
            var result = await _repo.All();
            if (!result.IsSuccess) return result.Error!;

            var records = result.Value!.Select(x => _mapper.Map<ReturnItemModel>(x));
            return Result<IEnumerable<ReturnItemModel>>.Success(records);
        }
    }
}
