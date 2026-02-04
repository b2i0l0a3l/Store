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
    public class UpdateProductHandler : IRequestHandler<UpdateProductRequest, Result<bool>>
    {
        private readonly IRepository<Product> _Repo;

        public UpdateProductHandler(IRepository<Product> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(UpdateProductRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Update(request.Id, p =>
            {
                p.Name = request.Name;
                p.Price = request.Price;
                p.Cost = request.Cost;
                p.CategoryId = request.CategoryId;
            });

            return result;
        }
    }
}
