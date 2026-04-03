using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class InvoiceItem
    {
        [Key]
        public int Id { get; set; }
        public string InvoiceId { get; set; } = string.Empty;
        public string productName { get; set; } = string.Empty;
        public int quantity { get; set; }
        public int price { get; set; }   
        [ForeignKey("InvoiceId")]
        public Invoice? Invoice { get; set; }
    }
}