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
    public class AddSupplierHandler : IRequestHandler<AddSupplierRequest, Result<SupplierModel>>
    {
        private readonly IRepository<Supplier> _Repo;
        private readonly IMapper _Mapper;

        public AddSupplierHandler(IRepository<Supplier> Repo, IMapper Mapper)
        {
            _Repo = Repo;
            _Mapper = Mapper;
        }

        public async Task<Result<SupplierModel>> Handle(AddSupplierRequest request, CancellationToken cancellationToken)
        {
            var supplier = new Supplier
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber
            };

            var result = await _Repo.Add(supplier);
            if (!result.IsSuccess) return result.Error!;

            return _Mapper.Map<SupplierModel>(result.Value);
        }
    }
}
