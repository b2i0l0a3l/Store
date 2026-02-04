using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddCategoryHandler : IRequestHandler<AddCategoryRequest, Result<CategoryModel>>
    {
        private readonly IRepository<Category> _Repo;
        private readonly IMapper _Mapper;

        public AddCategoryHandler(IRepository<Category> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }

        public async Task<Result<CategoryModel>> Handle(AddCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = new Category
            {
                Name = request.Name
            };

            var result = await _Repo.Add(category);
            if (!result.IsSuccess) return result.Error!;

            return _Mapper.Map<CategoryModel>(result.Value);
        }
    }
}
