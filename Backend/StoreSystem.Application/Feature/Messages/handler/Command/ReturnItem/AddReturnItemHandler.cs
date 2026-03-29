using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddReturnItemHandler : IRequestHandler<AddReturnItemRequest, Result<ReturnItemModel>>
    {
        private readonly IRepository<ReturnItem> _Repo;

        public AddReturnItemHandler(IRepository<ReturnItem> repo)
        {
            _Repo = repo;
        }

        public async Task<Result<ReturnItemModel>> Handle(AddReturnItemRequest request, CancellationToken cancellationToken)
        {
            var returnItem = new ReturnItem
            {
                ReturnId = request.ReturnId,
                ProductId = request.ProductId,
                Quantity = request.Quantity,
                Price = request.Price,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _Repo.Add(returnItem);
            if (!result.IsSuccess) return result.Error!;

            return ReturnItemModel.FromEntity(result.Value!);
        }
    }
}
