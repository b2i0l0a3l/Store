using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models.DashboardModels
{
    public class DashboardSummaryDto
    {
        public int TotalOrders { get; set; }
        public int TotalProducts { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal TotalRemainingDebt { get; set; }
    }
}
