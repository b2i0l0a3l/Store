using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StoreSystem.Application.Feature.Messages.Request.Command.user;
using StoreSystem.Application.Feature.Messages.Request.Query.UserQuery;

namespace StoreApi.Api.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/User")]
    [ApiVersion("1")]
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _mediator.Send(new GetAllUsersRequest());
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }
    }
}