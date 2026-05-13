using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Application.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddReturnItemHandler : IRequestHandler<AddReturnItemRequest, Result<int>>
    {
        private readonly IRepository<ReturnItem> _Repo;
        private readonly IBackgroundTaskQueue _taskQueue;

        public AddReturnItemHandler(IRepository<ReturnItem> repo, IBackgroundTaskQueue taskQueue)
        {
            _Repo = repo;
            _taskQueue = taskQueue;
        }

        public async Task<Result<int>> Handle(AddReturnItemRequest request, CancellationToken cancellationToken)
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

            await _taskQueue.EnqueueAsync(async (sp, ct) =>
            {
                var dashboardService = sp.GetService<IDashboardNotificationService>();
                if (dashboardService != null)
                {
                    await dashboardService.BroadcastDashboardUpdateAsync();
                }
            });

            return result;
        }
    }
}
