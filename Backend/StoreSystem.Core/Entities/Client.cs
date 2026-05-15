using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class Client : BaseEntity
    {
        
        [MaxLength(30)]
        [Required]
        public string? Name { get; set; } = string.Empty;
        [MaxLength(10)]
        public string? PhoneNumber { get; set; } 
        public string? Address { get; set; }
        
        public ICollection<Order>? Orders { get; set; }
        public ICollection<Debt>? Debts { get; set; }
        public ICollection<Invoice>? Invoices { get; set; }
    }
}