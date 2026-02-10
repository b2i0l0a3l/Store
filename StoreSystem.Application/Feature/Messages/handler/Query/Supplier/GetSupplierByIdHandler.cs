using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetSupplierByIdHandler : IRequestHandler<GetSupplierByIdRequest, Result<SupplierModel>>
    {
        private readonly IRepository<Supplier> _Repo;
        private readonly IMapper _Mapper;

        public GetSupplierByIdHandler(IRepository<Supplier> repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        public async Task<Result<SupplierModel>> Handle(GetSupplierByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.GetById(request.Id);
            if (!result.IsSuccess || result.Value == null)
                return new Error("NotFound", Core.enums.ErrorType.General, $"Supplier with Id {request.Id} not found");

            return _Mapper.Map<SupplierModel>(result.Value);
        }
    }
}
