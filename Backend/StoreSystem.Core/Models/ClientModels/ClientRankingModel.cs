using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models.ClientModels
{
    public class ClientRankingModel
    {
        public int ClientId { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public decimal TotalPurchases { get; set; }
        public int Rank { get; set; }
    }
}
