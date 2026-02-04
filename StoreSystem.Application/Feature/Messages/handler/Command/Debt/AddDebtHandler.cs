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
    public class AddDebtHandler : IRequestHandler<AddDebtRequest, Result<DebtModel>>
    {
        private readonly IRepository<Debt> _Repo;
        private readonly IMapper _Mapper;

        public AddDebtHandler(IRepository<Debt> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }

        public async Task<Result<DebtModel>> Handle(AddDebtRequest request, CancellationToken cancellationToken)
        {
            var debt = new Debt
            {
                OrderId = request.OrderId,
                ClientId = request.ClientId,
                Remaining = request.Remaining,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var result = await _Repo.Add(debt);
            if (!result.IsSuccess) return result.Error!;

            return _Mapper.Map<DebtModel>(result.Value);
        }
    }
}
