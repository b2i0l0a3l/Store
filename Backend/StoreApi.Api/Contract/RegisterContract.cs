using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace StoreApi.Api.Contract
{
    public class RegisterContract
    {
        [FromForm] public string Email { get; set; } = string.Empty;
        [FromForm] public string Password { get; set; } = string.Empty;
        [FromForm] public string FullName { get; set; } = string.Empty;
        [FromForm] public IFormFile? Image { get; set; } 
    }
}