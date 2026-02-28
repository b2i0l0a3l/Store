using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Entities
{
    public class Product
    {
        public int Id { get; set; }
        [MaxLength(50)]
        [Required]
        public string Name { get; set; } = string.Empty;
        [Column(TypeName = "numeric(18,2)")]
        public decimal Price { get; set; } 
        [Column(TypeName = "numeric(18,2)")]
        public decimal Cost { get; set; }
        [Required]
        [Range(0,int.MaxValue,ErrorMessage ="Quantity must be greather or equal 0")]
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Required]
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
      
        public ICollection<OrderItem>? OrderItems { get; set; }
        public ICollection<Debt>? Debts { get; set; }
        public ICollection<SupplierProduct>? SupplierProducts { get; set; }
    }
}