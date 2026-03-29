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

        public AddSupplierHandler(IRepository<Supplier> Repo)
        {
            _Repo = Repo;
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

            return SupplierModel.FromEntity(result.Value!);
        }
    }
}
