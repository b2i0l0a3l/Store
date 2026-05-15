using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Core.Models.UserModels;
using StoreSystem.Infrastructure.Persistence;
using StoreSystem.Infrastructure.Persistence.Repo;

namespace StoreSystem.Infrastructure.presistence.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _Context;

        public UserRepository(AppDbContext context)
        {
            _Context = context;
        }

        public async Task<Result<IEnumerable<UserModel>>> GetAllUsers()
        {
            var users = await (

                from user in _Context.Users
                join userRole in _Context.UserRoles
                on user.Id equals userRole.UserId into ur
                from userRole in ur.DefaultIfEmpty()

                join role in _Context.Roles on userRole.RoleId equals role.Id into r
                from role in r.DefaultIfEmpty()

                select new UserModel
                {
                    UserId = user.Id,
                    Email = user.Email ?? user.UserName!,
                    FullName = user.FullName,
                    Role = role != null ? role.Name : "User"
                }
            ).ToListAsync();

            if (users == null || !users.Any())
            {
                return new Error("NoUsersFound", Core.enums.ErrorType.NotFound, "No users found in the database.");
            }
            return users;
        }
        }
    }