using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Query.UserQuery;
using StoreSystem.Core.common;

namespace StoreApi.Api.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/User")]
    [ApiVersion("1")]
    [Authorize]
    public class UserController : ApiControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("ChangeRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> ChangeRole([FromBody] ChangeUserRoleRequest req)
        {
            var result = await _mediator.Send(req);
            return result.IsSuccess ? Ok("Role Changed Result.") : HandleFailure(result);
        }
        [HttpGet("GetUsers")]
        [Authorize(Roles = Roles.Admin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _mediator.Send(new GetAllUsersRequest());
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }
        [HttpGet("Me")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserInfo(IAuthorizationService authorizedUserService)
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("UserId claim is missing in the token.");
            }
            var authResult = await authorizedUserService.AuthorizeAsync(
            User,
            userId,
            "ViewerOrderOrAdmin");
            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var result = await _mediator.Send(new GetUserInfo { UserId = userId });
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }
        [HttpPost("ChangePassword")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePassword req)
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("UserId claim is missing in the token.");
            }
            req.UserId = userId;
            var result = await _mediator.Send(req);
            return result.IsSuccess ? Ok("Password Changed Successfully.") : HandleFailure(result);
        }
    }
}