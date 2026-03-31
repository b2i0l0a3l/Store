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
using StoreSystem.Core.interfaces.functions;
using StoreSystem.Core.Models;
using StoreSystem.Core.Models.ProductModels;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetAllProductsHandler : IRequestHandler<GetAllProductsRequest, Result<IEnumerable<GetAllProductModel>>>
    {
        private readonly IGetAllProductsFunction _repo;

        public GetAllProductsHandler(IGetAllProductsFunction repo)
        {
            _repo = repo;
        }

        public async Task<Result<IEnumerable<GetAllProductModel>>> Handle(GetAllProductsRequest request, CancellationToken cancellationToken)
        {
            return await _repo.handle();
        }
    }
}
