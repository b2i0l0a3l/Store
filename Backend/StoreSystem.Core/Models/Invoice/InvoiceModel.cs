using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.enums;

namespace StoreSystem.Core.Models.Invoice
{
    public class InvoiceModel
    {
        public string Id { get; set; } = string.Empty;
        public int ClientId { get; set; }
        public required List<InvoiceItem> Items { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public decimal Total { get; set; }
    }
    public class InvoiceItem
    {
        public int productName { get; set; }
        public int quantity { get; set; }
        public decimal price { get; set; }
    }
}