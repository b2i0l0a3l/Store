using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using StoreSystem.Core.enums;

namespace StoreSystem.Core.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        Public enOrderType OrderType {get;Set;} = enOrderType.Sell;
        public int ClientId { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "Total Must be greather than 0")]
        [Column(TypeName = "numeric(18,2)")]

        public decimal Total { get; set; } 
        [ForeignKey("ClientId")]
        public Client? Client { get; set; }
    
    }
}