using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class DeleteProductHandler : IRequestHandler<DeleteProductRequest, Result<bool>>
    {
        private readonly IRepository<Product> _Repo;

        public DeleteProductHandler(IRepository<Product> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(DeleteProductRequest request, CancellationToken cancellationToken)
        {
            return await _Repo.Delete(request.Id);
        }
    }
}
