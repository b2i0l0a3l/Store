using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;

        public UserRepository(AppDbContext context, UserManager<User> userManager)
        {
            _Context = context;
            _userManager = userManager;
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

        public async Task<Result<UserModel>> GetUserById(string id)
        {
            var user = await _Context.Users.Where(u => u.Id == id).Select(user => new UserModel
            {
                Email = user.Email ?? user.UserName!,
                FullName = user.FullName,
                Role = _Context.UserRoles.Where(ur => ur.UserId == user.Id)
                    .Join(_Context.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => r.Name)
                    .FirstOrDefault() ?? "User"
            }).FirstOrDefaultAsync();
            if (user == null)
            {
                return new Error("UserNotFound", Core.enums.ErrorType.NotFound, $"No user found with ID {id}.");
            }
            return user;
        }
        public async Task<Result<bool>> ChangePassword(string userId, string oldPassword, string newPassword)
        {
            var user = await _Context.Users.FindAsync(userId);
            if (user == null)
            {
                return new Error("UserNotFound", Core.enums.ErrorType.NotFound, $"No user found with ID {userId}.");
            }

            var isMatch = await _userManager.CheckPasswordAsync(user, oldPassword);
            if (!isMatch)
            {
                return new Error("InvalidPassword", Core.enums.ErrorType.Validation, "The provided old password is incorrect.");
            }

            var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
            if (!result.Succeeded)
            {
                var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                return new Error("PasswordChangeFailed", Core.enums.ErrorType.Failure, $"Failed to change password: {errors}");
            }

            try
            {
                await _Context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return new Error("DatabaseError", Core.enums.ErrorType.Failure, $"An error occurred while updating the password: {ex.Message}");
            }
        }
    }
}