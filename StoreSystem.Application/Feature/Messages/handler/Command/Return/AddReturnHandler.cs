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
using ReturnEntity = StoreSystem.Core.Entities.Return;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddReturnHandler : IRequestHandler<AddReturnRequest, Result<ReturnModel>>
    {
        private readonly IUniteOfWork _Uow;
        private readonly IMapper _Mapper;

        public AddReturnHandler(IUniteOfWork uow, IMapper mapper)
        {
            _Uow = uow;
            _Mapper = mapper;
        }

        public async Task<Result<ReturnModel>> Handle(AddReturnRequest request, CancellationToken cancellationToken)
        {
            var returnRecord = new ReturnEntity
            {
                OrderId = request.OrderId,
                ClientId = request.ClientId,
                TotalRefund = request.TotalRefund,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _Uow.Return.Add(returnRecord);
            if (!result.IsSuccess) return result.Error!;

            return _Mapper.Map<ReturnModel>(result.Value);
        }
    }
}
