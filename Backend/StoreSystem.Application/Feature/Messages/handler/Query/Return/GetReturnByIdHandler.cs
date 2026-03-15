using AutoMapper;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.common;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using ReturnEntity = StoreSystem.Core.Entities.Return;

namespace StoreSystem.Application.Feature.Messages.handler.Query
{
    public class GetReturnByIdHandler : IRequestHandler<GetReturnByIdRequest, Result<ReturnModel>>
    {
        private readonly IRepository<ReturnEntity> _Repo;
        private readonly IMapper _Mapper;

        public GetReturnByIdHandler(IRepository<ReturnEntity> repo, IMapper mapper)
        {
            _Repo = repo;
            _Mapper = mapper;
        }

        public async Task<Result<ReturnModel>> Handle(GetReturnByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.GetById(request.Id);
            if (!result.IsSuccess || result.Value == null)
                return new Error("NotFound", Core.enums.ErrorType.General, $"Return with Id {request.Id} not found");

            return _Mapper.Map<ReturnModel>(result.Value);
        }
    }
}
