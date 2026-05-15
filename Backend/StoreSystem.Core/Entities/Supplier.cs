using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class Supplier : BaseEntity
    {
        
        [MaxLength(30)]
        [Required]
        public string Name { get; set; } = string.Empty;
        [MaxLength(10)]
        public string? PhoneNumber { get; set; } 

        public ICollection<SupplierProduct>? SupplierProducts { get; set; }
    }
}