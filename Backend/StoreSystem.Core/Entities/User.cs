using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace StoreSystem.Core.Entities
{
    public class User : IdentityUser
    {
        [Required]
        [MaxLength(30)]
        public string FullName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string? ImagePath { get; set; }

    }
}