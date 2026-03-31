using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetDebtHandler : IRequestHandler<GetDebtsRequest, Result<PagedResult<DebtModel>>>
    {
        private readonly IRepository<Debt> _Repo;        public GetDebtHandler(IRepository<Debt> Repo)
        {
            _Repo = Repo;        }
        public async Task<Result<PagedResult<DebtModel>>> Handle(GetDebtsRequest request, CancellationToken cancellationToken)
        {
            Result<PagedResult<Debt>?> result = await _Repo.GetAll(request.PageNumber, request.PageSize);
            if (!result.IsSuccess) return result.Error!;

            PagedResult<DebtModel> records = new()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Items = result.Value!.Items.Select(x => DebtModel.FromEntity(x)),
                TotalItems = result.Value.TotalItems,
            };

            return records;
        }
    }
}
