using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingSystem.Core.common;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.HELPER
{
    public static class DbSeeder
    {

        public static async Task SeedAdminAsync(
            UserManager<User> userManager,
            IConfiguration config)
        {
            
            var adminExists = await userManager.FindByEmailAsync(config["ADMIN_EMAIL"]);

            if (adminExists != null) return;

            User admin = new ()
            {
                UserName = config["ADMIN_EMAIL"],
                Email = config["ADMIN_EMAIL"],
                EmailConfirmed = true,
                FullName = "Admin"
            };
            var result = await userManager.CreateAsync(
                admin,
                config["ADMIN_PASSWORD"]!
            );
            if(result.Succeeded)
                await userManager.AddToRoleAsync(admin,Roles.Admin);
        }
    }
}