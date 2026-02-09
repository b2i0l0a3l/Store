using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class Payment
    {
        public int Id { get; set; }
        public DateTime PaidAt { get; set; } = DateTime.UtcNow;
        public int DebtID { get; set; }
        [Column(TypeName = "numeric(18,2)")]
        public decimal Amount { get; set; }
        public Debt? Debt { get; set; }
    }
}