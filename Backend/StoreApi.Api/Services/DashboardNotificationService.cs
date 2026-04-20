using Microsoft.AspNetCore.SignalR;
using StoreSystem.Application.Interface;
using StoreApi.Api.Hubs;
using System.Threading.Tasks;

namespace StoreApi.Api.Services
{
    public class DashboardNotificationService : IDashboardNotificationService
    {
        private readonly IHubContext<DashboardHub> _hubContext;

        public DashboardNotificationService(IHubContext<DashboardHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task BroadcastDashboardUpdateAsync()
        {
            await _hubContext.Clients.All.SendAsync("ReceiveDashboardUpdate");
        }
    }
}
