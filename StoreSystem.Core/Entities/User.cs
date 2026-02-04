using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace StoreSystem.Core.Entities
{
    public class User : IdentityUser
    {
        public string Role = string.Empty;
    }
}