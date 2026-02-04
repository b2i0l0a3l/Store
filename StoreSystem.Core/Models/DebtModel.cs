using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public record DebtModel
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public decimal Remaining { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
