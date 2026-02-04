using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public record SupplierModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
    }
}
