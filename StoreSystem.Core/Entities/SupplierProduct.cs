using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class SupplierProduct
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int SupplierId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("SupplierId")]
        public Supplier? Supplier { get; set; }
        [ForeignKey("ProductId")]
        public Product? Product { get; set; }

        
    }
}