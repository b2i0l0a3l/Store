using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetPaymentByIdHandler : IRequestHandler<GetPaymentByIdRequest, Result<PaymentModel>>
    {
        private readonly IRepository<Payment> _Repo;
        private readonly IMapper _Mapper;

        public GetPaymentByIdHandler(IRepository<Payment> repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        public async Task<Result<PaymentModel>> Handle(GetPaymentByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.GetById(request.Id);
            if (!result.IsSuccess || result.Value == null)
                return new Error("NotFound", Core.enums.ErrorType.General, $"Payment with Id {request.Id} not found");

            return _Mapper.Map<PaymentModel>(result.Value);
        }
    }
}
