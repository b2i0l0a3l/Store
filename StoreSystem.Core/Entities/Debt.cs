using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.enums;

namespace StoreSystem.Core.Entities
{
    public class Debt
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        [Column(TypeName = "numeric(18,2)")]
        public decimal Remaining { get; set; }

        [ForeignKey("ClientId")]
        public Client? Client { get; set; }
        [ForeignKey("OrderId")]
        public Order? Order { get; set; }

        public ICollection<Debt>? Debts { get; set; }

    }
}