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
    public class GetSupplierHandler : IRequestHandler<GetSuppliersRequest, Result<PagedResult<SupplierModel>>>
    {
        private readonly IRepository<Supplier> _Repo;
        private readonly IMapper _Mapper;
        public GetSupplierHandler(IRepository<Supplier> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }
        public async Task<Result<PagedResult<SupplierModel>>> Handle(GetSuppliersRequest request, CancellationToken cancellationToken)
        {
            Result<PagedResult<Supplier>?> result = await _Repo.GetAll(request.PageNumber, request.PageSize);
            if (!result.IsSuccess) return result.Error!;

            PagedResult<SupplierModel> records = new()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Items = result.Value!.Items.Select(x => _Mapper.Map<SupplierModel>(x)),
                TotalItems = result.Value.TotalItems,
            };

            return records;
        }
    }
}
