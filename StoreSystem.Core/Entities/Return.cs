using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class Return
    {
        [Key]
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ClientId { get; set; }
        [Column(TypeName = "numeric(18,2)")]
        public decimal TotalRefund { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("OrderId")]
        public Order? Order { get; set; }
        [ForeignKey("ClientId")]
        public Client? Client { get; set; }

        public ICollection<ReturnItem>? ReturnItems { get; set; }
    }
}
