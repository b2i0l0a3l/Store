using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using StoreSystem.Application.Feature.Messages.Request.Command.user;
using StoreSystem.Core.common;
using StoreSystem.Core.Entities;

namespace StoreSystem.Application.Feature.Messages.handler.Command.UserHandler
{
    public class ChangeUserRoleHandler : IRequestHandler<ChangeUserRoleRequest, Result>
    {
        private readonly UserManager<User> _UserManager;
        private readonly RoleManager<IdentityRole> _RoleManager;
        public ChangeUserRoleHandler(UserManager<User> UserManager,RoleManager<IdentityRole> RoleManager)
        {
            _UserManager = UserManager;
            _RoleManager = RoleManager;
        }
        public async Task<Result> Handle(ChangeUserRoleRequest request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(request.Role)) return new Error("RoleIsRequired", Core.enums.ErrorType.General, "Role Not Found");
            User? User = await _UserManager.FindByIdAsync(request.UserId);
            if (User == null) return Errors.UserNotFoundError;
          
            var roleExists = await _RoleManager.RoleExistsAsync(request.Role);
            if (!roleExists)
                return new Error("InvalidRole", Core.enums.ErrorType.General, "Role does not exist");
            var currentRoles = await _UserManager.GetRolesAsync(User);
            if (currentRoles.Any())
            {
                var removeResult = await _UserManager.RemoveFromRolesAsync(User, currentRoles);
                if (!removeResult.Succeeded)
                    return new Error("RemoveRoleFailed", Core.enums.ErrorType.General, "Failed to remove old roles");
            }
            var addResult = await _UserManager.AddToRoleAsync(User, request.Role);
            if (!addResult.Succeeded)
                return new Error("AddRoleFailed", Core.enums.ErrorType.General, "Failed to add new role");
            User.Role = request.Role;
            await _UserManager.UpdateAsync(User);
            return Result.Success();    
        }
    }
}