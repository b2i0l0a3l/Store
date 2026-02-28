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
    public class UpdateCategoryHandler : IRequestHandler<UpdateCategoryRequest, Result<bool>>
    {
        private readonly IRepository<Category> _Repo;

        public UpdateCategoryHandler(IRepository<Category> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<bool>> Handle(UpdateCategoryRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Update(request.Id, c =>
            {
                c.Name = request.Name;
            });
            return result;
        }
    }
}
