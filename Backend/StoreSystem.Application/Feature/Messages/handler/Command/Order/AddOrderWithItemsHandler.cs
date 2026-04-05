using System;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command.Order;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;
using StoreSystem.Application.Interface;

namespace StoreSystem.Application.Feature.Messages.handler.Command.Order
{
    public class AddOrderWithItemsHandler : IRequestHandler<AddOrderWithItemsRequest, Result>
    {
        private readonly IHandleOrderWithHisItemsProcedure _Repo;
        private readonly IBackgroundTaskQueue _taskQueue;

        public AddOrderWithItemsHandler(
            IHandleOrderWithHisItemsProcedure rep,
            IBackgroundTaskQueue taskQueue)
        {
            _Repo = rep;
            _taskQueue = taskQueue;
        }

        public async Task<Result> Handle(AddOrderWithItemsRequest request, CancellationToken cancellationToken)
        {
            OrderWithItemModel req = new()
            {
                Client_Id = request.ClientId,
                OrderType = request.OrderType,
                Items = request.Items
            };
            var result = await _Repo.handle(req);

            if (result.IsSuccess)
            {
                var itemsCopy = request.Items.ToList();
                int itemCount = itemsCopy.Count;

                await _taskQueue.EnqueueAsync(async (sp, ct) =>
                {

                    IRepository<Notifications> notificationRepo = sp.GetRequiredService<IRepository<Notifications>>();
                    INotificationService notificationService = sp.GetRequiredService<INotificationService>();
                    ILowStockChecker lowStockChecker = sp.GetRequiredService<ILowStockChecker>();

                    List<Notifications> notificationsToInsert = new ();

                    Notifications orderNotification = new ()
                    {
                        Title = "New Order",
                        Message = $"New order has been created with {itemCount} products",
                        Type = enNotificationType.NewOrder,
                        RelatedEntityType = "Order"
                    };
                    notificationsToInsert.Add(orderNotification);

                    var productIds = itemsCopy.Select(i => i.productId).ToList();
                    var lowStockProducts = await lowStockChecker.GetLowStockProducts(productIds, 5);

                    foreach (var product in lowStockProducts)
                    {
                        var lowStockNotification = new Notifications
                        {
                            Title = "Low Stock",
                            Message = $"The product \"{product.Name}\" has reached {product.Quantity} units only",
                            Type = enNotificationType.LowStock,
                            RelatedEntityId = product.Id.ToString(),
                            RelatedEntityType = "Product"
                        };
                        notificationsToInsert.Add(lowStockNotification);
                    }
                    await notificationRepo.AddRange(notificationsToInsert);

                    int batchSize = 10;
                    for (int i = 0; i < notificationsToInsert.Count; i += batchSize)
                    {
                        var batch = notificationsToInsert.Skip(i).Take(batchSize).ToList();
                        await Task.WhenAll(batch.Select(n => notificationService.BroadcastNotificationAsync(n)));
                    }
                
                    });
            }

            return result;
        }
    }
}