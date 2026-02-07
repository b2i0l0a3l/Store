using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace StoreApi.Api.Authorization
{
    public class RoleHandler : AuthorizationHandler<RoleRequirement, int>

    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, RoleRequirement requirement, int resource)
        {
            if (context.User.IsInRole("Admin"))
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }

            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (int.TryParse(userId, out int authenticatedStudentId) &&
                authenticatedStudentId == resource)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}