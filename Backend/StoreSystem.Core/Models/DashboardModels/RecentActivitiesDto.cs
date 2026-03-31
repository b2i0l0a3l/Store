using System.Collections.Generic;

namespace StoreSystem.Core.Models.DashboardModels
{
    public class RecentActivitiesDto
    {
        public IEnumerable<RecentOrderModel> RecentOrders { get; set; } = new List<RecentOrderModel>();
        public IEnumerable<RecentPaymentModel> RecentPayments { get; set; } = new List<RecentPaymentModel>();
    }
}
