using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using StoreSystem.Application.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddProductHandler : IRequestHandler<AddProductRequest, Result<ProductModel>>
    {
        private readonly IRepository<Product> _Repo;
        private readonly IBackgroundTaskQueue _taskQueue;

        public AddProductHandler(IRepository<Product> Repo, IBackgroundTaskQueue taskQueue)
        {
            _Repo = Repo;
            _taskQueue = taskQueue;
        }

        public async Task<Result<ProductModel>> Handle(AddProductRequest request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Name = request.Name,
                Price = request.Price,
                Cost = request.Cost,
                Quantity = request.Quantity,
                CategoryId = request.CategoryId,
                ImagePath = request.ImagePath,
                BarCode = request.CodeBar
            };

            var result = await _Repo.Add(product);
            if (!result.IsSuccess) return result.Error!;

            await _taskQueue.EnqueueAsync(async (sp, ct) =>
            {
                var dashboardService = sp.GetService<IDashboardNotificationService>();
                if (dashboardService != null)
                {
                    await dashboardService.BroadcastDashboardUpdateAsync();
                }
            });

            return ProductModel.FromEntity(result.Value!);
        }
    }
}
