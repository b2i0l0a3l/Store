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
    public class GetAllSuppliersHandler : IRequestHandler<GetAllSuppliersRequest, Result<IEnumerable<SupplierModel>>>
    {
        private readonly IRepository<Supplier> _repo;
        public GetAllSuppliersHandler(IRepository<Supplier> repo)
        {
            _repo = repo;        }

        public async Task<Result<IEnumerable<SupplierModel>>> Handle(GetAllSuppliersRequest request, CancellationToken cancellationToken)
        {
            var result = await _repo.All();
            if (!result.IsSuccess) return result.Error!;

            var records = result.Value!.Select(x => SupplierModel.FromEntity(x));
            return Result<IEnumerable<SupplierModel>>.Success(records);
        }
    }
}
