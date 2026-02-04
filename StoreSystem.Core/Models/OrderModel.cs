using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public record OrderModel
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public decimal Total { get; set; }
    }
}
