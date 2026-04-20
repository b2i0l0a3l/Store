using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using BookingSystem.Core.common;

namespace StoreApi.Api.Hubs
{
    [Authorize(Roles = Roles.Admin)]
    public class DashboardHub : Hub
    {
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
