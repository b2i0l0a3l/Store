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
    public class GetPaymentHandler : IRequestHandler<GetPaymentsRequest, Result<PagedResult<PaymentModel>>>
    {
        private readonly IRepository<Payment> _Repo;
        private readonly IMapper _Mapper;
        public GetPaymentHandler(IRepository<Payment> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }
        public async Task<Result<PagedResult<PaymentModel>>> Handle(GetPaymentsRequest request, CancellationToken cancellationToken)
        {
            Result<PagedResult<Payment>?> result = await _Repo.GetAll(request.PageNumber, request.PageSize);
            if (!result.IsSuccess) return result.Error!;

            PagedResult<PaymentModel> records = new()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Items = result.Value!.Items.Select(x => _Mapper.Map<PaymentModel>(x)),
                TotalItems = result.Value.TotalItems,
            };

            return records;
        }
    }
}
