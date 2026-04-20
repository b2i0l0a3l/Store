using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Application.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class DeleteOrderHandler : IRequestHandler<DeleteOrderRequest, Result<bool>>
    {
        private readonly IRepository<Core.Entities.Order> _Repo;
        private readonly IBackgroundTaskQueue _taskQueue;

        public DeleteOrderHandler(IRepository<Core.Entities.Order> Repo, IBackgroundTaskQueue taskQueue)
        {
            _Repo = Repo;
            _taskQueue = taskQueue;
        }

        public async Task<Result<bool>> Handle(DeleteOrderRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Delete(request.Id);

            if (result.IsSuccess)
            {
                await _taskQueue.EnqueueAsync(async (sp, ct) =>
                {
                    var dashboardService = sp.GetService<IDashboardNotificationService>();
                    if (dashboardService != null)
                    {
                        await dashboardService.BroadcastDashboardUpdateAsync();
                    }
                });
            }

            return result;
        }
    }
}
