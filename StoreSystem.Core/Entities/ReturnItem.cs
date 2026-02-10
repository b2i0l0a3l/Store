using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class ReturnItem
    {
        [Key]
        public int Id { get; set; }
        public int ReturnId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "numeric(18,2)")]
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("ReturnId")]
        public Return? Return { get; set; }
        [ForeignKey("ProductId")]
        public Product? Product { get; set; }
    }
}
