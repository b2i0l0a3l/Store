using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetReturnItemByIdHandler : IRequestHandler<GetReturnItemByIdRequest, Result<ReturnItemModel>>
    {
        private readonly IRepository<ReturnItem> _Repo;
        private readonly IMapper _Mapper;

        public GetReturnItemByIdHandler(IRepository<ReturnItem> repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        public async Task<Result<ReturnItemModel>> Handle(GetReturnItemByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.GetById(request.Id);
            if (!result.IsSuccess || result.Value == null)
                return new Error("NotFound", Core.enums.ErrorType.General, $"ReturnItem with Id {request.Id} not found");

            return _Mapper.Map<ReturnItemModel>(result.Value);
        }
    }
}
