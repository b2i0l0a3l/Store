using MediatR;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;

namespace StoreSystem.Application.Feature.Messages.Request.Command.Notification
{
    public class CreateNotificationCommand : IRequest<Result<bool>>
    {
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public enNotificationType Type { get; set; }
        public string? RelatedEntityId { get; set; }
        public string? RelatedEntityType { get; set; }
    }
}
