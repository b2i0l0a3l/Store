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
    public class GetCategoryHandler : IRequestHandler<GetCategoriesRequest, Result<PagedResult<CategoryModel>>>
    {
        private readonly IRepository<Category> _Repo;
        private readonly IMapper _Mapper;
        public GetCategoryHandler(IRepository<Category> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }
        public async Task<Result<PagedResult<CategoryModel>>> Handle(GetCategoriesRequest request, CancellationToken cancellationToken)
        {
            Result<PagedResult<Category>?> result = await _Repo.GetAll(request.PageNumber, request.PageSize);
            if (!result.IsSuccess) return result.Error!;

            PagedResult<CategoryModel> records = new()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Items = result.Value!.Items.Select(x => _Mapper.Map<CategoryModel>(x)),
                TotalItems = result.Value.TotalItems,
            };

            return records;
        }
    }
}
