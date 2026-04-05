using Microsoft.AspNetCore.SignalR;
using StoreSystem.Application.Interface;
using StoreSystem.Core.Entities;
using StoreApi.Api.Hubs;
using System.Threading.Tasks;

namespace StoreApi.Api.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationService(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task BroadcastNotificationAsync(Notifications notification)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", notification);
        }
    }
}
