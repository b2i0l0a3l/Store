using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using StoreSystem.Core.Entities;

namespace StoreApi.Api.Hubs
{
    [Authorize]
    public class NotificationHub : Hub
    {
        // Hub methods to allow client to communicate back if needed.
        // For now, the server will broadcast to clients.
        
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}
