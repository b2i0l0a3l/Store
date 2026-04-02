using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace StoreApi.Api.Contract.Product
{
    public class UpdateProduct
    {
        [FromForm] public int Id { get; set; }
        [FromForm] public string Name { get; set; } = string.Empty;
        [FromForm] public string? CodeBar { get; set; }
        [FromForm] public decimal Price { get; set; }
        [FromForm] public decimal Cost { get; set; }
        [FromForm] public int Quantity { get; set; }
        [FromForm] public int CategoryId { get; set; }
        [FromForm] public IFormFile? ProductImage { get; set; }
    }
}
