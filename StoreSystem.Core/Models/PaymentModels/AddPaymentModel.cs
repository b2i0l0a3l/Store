using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public class AddPaymentModel
    {
        public int DebtId { get; set; }
        public decimal Amount { get; set; }
    }
}