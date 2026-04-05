using StoreSystem.Core.Entities;
using System.Threading.Tasks;

namespace StoreSystem.Application.Interface
{
    public interface INotificationService
    {
        Task BroadcastNotificationAsync(Notifications notification);
    }
}
