using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public record ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } 
        public decimal Cost { get; set; }
        public int CategoryId { get; set; }
    }
}