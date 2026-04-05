using MediatR;
using Microsoft.Extensions.DependencyInjection;
using StoreSystem.Application.Common;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Interface;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.enums;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models;

namespace StoreSystem.Application.Feature.Messages.handler.Command
{
    public class AddPaymentHandler : IRequestHandler<AddPaymentRequest, Result>
    {
        private readonly IAddPaymentProcedure _Repo;
        private readonly IBackgroundTaskQueue _taskQueue;

        public AddPaymentHandler(IAddPaymentProcedure Repo,IBackgroundTaskQueue taskQueue)
        {
            _Repo = Repo;
            _taskQueue = taskQueue;
        }

        public async Task<Result> Handle(AddPaymentRequest request, CancellationToken cancellationToken)
        {
            var result = await _Repo.Handle(new AddPaymentModel { Amount = request.Amount, DebtId = request.DebtId });
              await _taskQueue.EnqueueAsync(async (sp, ct) =>
                {

                    IRepository<Notifications> notificationRepo = sp.GetRequiredService<IRepository<Notifications>>();
                    INotificationService notificationService = sp.GetRequiredService<INotificationService>();

                    Notifications orderNotification = new ()
                    {
                        Title = "New Payment",
                        Message = $"Debt  {request.DebtId} received payment of {request.Amount} ",
                        Type = enNotificationType.PaymentReceived,
                        RelatedEntityType = "Payments"
                    };

                    await notificationRepo.Add(orderNotification);

                    await  notificationService.BroadcastNotificationAsync(orderNotification);
                
                    });
            return result;
        }
    }
}
