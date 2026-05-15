using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class Return : BaseEntity
    {
        [Key]
        
        [Required]
        public int OrderId { get; set; }
        [Column(TypeName = "numeric(18,2)")]
        public decimal TotalRefund { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [MaxLength(200)]
        public string? Notes { get; set; }
        
        [ForeignKey("OrderId")]
        public Order? Order { get; set; }
        public ICollection<ReturnItem>? ReturnItems { get; set; }
    }
}
