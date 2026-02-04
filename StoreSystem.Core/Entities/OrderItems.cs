using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class OrderItem
    {
        public int Id{ get; set; }
        public int ProductId { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "Price Must be greather than 0")]
        [Column(TypeName = "numeric(18,2)")]
        public decimal Price { get; set; }

        [ForeignKey("ProductId")]
        public Product? Product { get; set; }

    }
}