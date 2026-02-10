using Microsoft.AspNetCore.Mvc;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.Models;
using StoreSystem.Core.common;

namespace StoreApi.Api.Controllers
{
    [Route("api/Debt")]
    [ApiController]
    public class DebtController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DebtController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll([FromQuery] GetDebtsRequest req)
        {
            var result = await _mediator.Send(req);
            return Ok(result);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new GetDebtByIdRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] AddDebtRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateDebtRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteDebtRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }
    }
}
