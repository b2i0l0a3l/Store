using Microsoft.AspNetCore.Mvc;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Command.OrderWithITem;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.Models;
using StoreSystem.Core.common;

namespace StoreApi.Api.Controllers
{
    [Route("api/Return")]
    [ApiController]
    public class ReturnController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ReturnController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll([FromQuery] GetReturnsRequest req)
        {
            var result = await _mediator.Send(req);
            return Ok(result);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new GetReturnByIdRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] AddReturnRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateReturnRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteReturnRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPost("ReturnItem")]
        public async Task<IActionResult> ReturnItem([FromBody] ReturnOrderItemRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result);
        }
    }
}

