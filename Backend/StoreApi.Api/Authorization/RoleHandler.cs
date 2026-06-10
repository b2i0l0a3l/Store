using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace StoreApi.Api.Authorization
{
    public class RoleHandler : AuthorizationHandler<RoleRequirement, string>

    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, RoleRequirement requirement, string resource)
        {
            if (context.User.IsInRole("Admin"))
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }

            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (
                userId == resource)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}