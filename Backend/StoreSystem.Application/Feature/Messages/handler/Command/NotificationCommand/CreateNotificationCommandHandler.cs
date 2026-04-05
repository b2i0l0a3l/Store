using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command.Notification;
using StoreSystem.Application.Interface;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;

namespace StoreSystem.Application.Feature.Messages.handler.Command.NotificationCommand
{
    public class CreateNotificationCommandHandler : IRequestHandler<CreateNotificationCommand, Result<bool>>
    {
        private readonly IRepository<Notifications> _repo;
        private readonly INotificationService _notificationService;

        public CreateNotificationCommandHandler(
            IRepository<Notifications> repo,
            INotificationService notificationService)
        {
            _repo = repo;
            _notificationService = notificationService;
        }

        public async Task<Result<bool>> Handle(CreateNotificationCommand request, CancellationToken cancellationToken)
        {
            var notification = new Notifications
            {
                Title = request.Title,
                Message = request.Message,
                Type = request.Type,
                RelatedEntityId = request.RelatedEntityId,
                RelatedEntityType = request.RelatedEntityType,
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _repo.Add(notification);
            if (!result.IsSuccess)
                return new Error("NotificationFailed", StoreSystem.Core.enums.ErrorType.Failure, "Failed to save notification.");

            await _notificationService.BroadcastNotificationAsync(notification);

            return true;
        }
    }
}
