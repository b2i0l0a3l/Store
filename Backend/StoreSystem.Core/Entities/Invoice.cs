using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class Invoice
    {
        [Key]
        public string Id { get; set; } = string.Empty;
        public int? ClientId{ get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("ClientId")]
        public Client? Client { get; set; }
        public decimal Total { get; set; }
        public List<InvoiceItem>? InvoiceItems{ get; set; }
    }
}