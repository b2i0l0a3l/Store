using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public record ReturnModel
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public decimal TotalRefund { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
