using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddSupplierHandler : IRequestHandler<AddSupplierRequest, Result<int>>
    {
        private readonly IRepository<Supplier> _Repo;

        public AddSupplierHandler(IRepository<Supplier> Repo)
        {
            _Repo = Repo;
        }

        public async Task<Result<int>> Handle(AddSupplierRequest request, CancellationToken cancellationToken)
        {
            var supplier = new Supplier
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber
            };

            var result = await _Repo.Add(supplier);
            return result;
        }
    }
}
