using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreSystem.Core.Models
{
    public class RegisterModel
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Role { get; set; } = string.Empty;
    }
}