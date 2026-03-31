using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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
        public GetAllSupplierProductsHandler(IRepository<SupplierProduct> repo)
        {
            _repo = repo;        }

        public async Task<Result<IEnumerable<SupplierProductModel>>> Handle(GetAllSupplierProductsRequest request, CancellationToken cancellationToken)
        {
            var result = await _repo.All();
            if (!result.IsSuccess) return result.Error!;

            var records = result.Value!.Select(x => SupplierProductModel.FromEntity(x));
            return Result<IEnumerable<SupplierProductModel>>.Success(records);
        }
    }
}
