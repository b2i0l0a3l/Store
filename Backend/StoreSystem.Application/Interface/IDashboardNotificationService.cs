using System.Threading.Tasks;

namespace StoreSystem.Application.Interface
{
    public interface IDashboardNotificationService
    {
        Task BroadcastDashboardUpdateAsync();
    }
}
