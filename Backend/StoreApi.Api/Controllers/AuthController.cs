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

namespace StoreApi.Api.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/Auth")]
    [ApiVersion("1")]
    public class AuthController : ControllerBase
    {
        private readonly IUploadImage _Upload;
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator,IUploadImage Upload)
        {
            _mediator = mediator;
            _Upload = Upload;
        }
        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromForm] RegisterContract req)
        {
            RegisterRequest request = new()
            {
                Email = req.Email,
                FullName = req.FullName,
                Password = req.Password
            };
            if (req.Image != null && req.Image.Length != 0)
            {
                using var stream = req.Image.OpenReadStream();
                request.ImagePath = await _Upload.Upload(stream, req.Image.FileName,"UserImages");
            }
            
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPost("Login")]
        [EnableRateLimiting("AuthLimiter")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
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
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPost("Logout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        {
            var tokenId = User?.FindFirst("TokenId")?.Value;
            request.TokenId = tokenId;

            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result);
        }
    }
}
