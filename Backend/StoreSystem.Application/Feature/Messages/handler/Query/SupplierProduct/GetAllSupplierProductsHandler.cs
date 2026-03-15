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
    public class GetAllSupplierProductsHandler : IRequestHandler<GetAllSupplierProductsRequest, Result<IEnumerable<SupplierProductModel>>>
    {
        private readonly IRepository<SupplierProduct> _repo;
        private readonly IMapper _mapper;

        public GetAllSupplierProductsHandler(IRepository<SupplierProduct> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<Result<IEnumerable<SupplierProductModel>>> Handle(GetAllSupplierProductsRequest request, CancellationToken cancellationToken)
        {
            var result = await _repo.All();
            if (!result.IsSuccess) return result.Error!;

            var records = result.Value!.Select(x => _mapper.Map<SupplierProductModel>(x));
            return Result<IEnumerable<SupplierProductModel>>.Success(records);
        }
    }
}
