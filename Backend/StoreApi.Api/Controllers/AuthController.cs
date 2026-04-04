using Microsoft.AspNetCore.Mvc;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command.Login;
using StoreSystem.Application.Feature.Messages.Request.Command.Refresh;
using StoreSystem.Core.Models;
using StoreSystem.Core.common;
using StoreSystem.Application.Feature.Messages.Request.Command.Logout;
using StoreSystem.Application.Feature.Messages.Request.Command.Register;
using Microsoft.AspNetCore.RateLimiting;
using StoreSystem.Application.Interface;
using StoreApi.Api.Contract;
using Asp.Versioning;
using StoreSystem.Core.interfaces;
using StoreApi.Api.Utils;

namespace StoreApi.Api.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/Auth")]
    [ApiVersion("1")]
    public class AuthController : ApiControllerBase
    {
        private readonly IMediator _mediator;
        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromForm] RegisterContract req)
        {
            IFileData? fileData = null;
            if (req.Image != null && req.Image.Length != 0)
            {
                fileData = new FormFileData(req.Image);
            }
            RegisterRequest request = new()
            {
                Email = req.Email,
                FullName = req.FullName,
                Password = req.Password,
                Image = fileData
            };

            var result = await _mediator.Send(request);
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }

        [HttpPost("Login")]
        [EnableRateLimiting("AuthLimiter")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _mediator.Send(request);
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }

        [HttpPost("Refresh")]
        [EnableRateLimiting("AuthLimiter")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            var tokenId = User?.FindFirst("TokenId")?.Value;
            Console.WriteLine("TokenId: " + tokenId);
            request.TokenId = tokenId;
            var result = await _mediator.Send(request);
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }

        [HttpPost("Logout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        {
            var tokenId = User?.FindFirst("TokenId")?.Value;
            request.TokenId = tokenId;

            var result = await _mediator.Send(request);
            return result.IsSuccess ? Ok() : HandleFailure(result);
        }
    }
}
