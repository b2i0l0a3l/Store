using Microsoft.AspNetCore.Mvc;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.Models;
using StoreSystem.Core.common;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;

namespace StoreApi.Api.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/Debt")]
    [ApiVersion("1")]
    [Authorize]
    public class DebtController : ApiControllerBase
    {
        private readonly IMediator _mediator;

        public DebtController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetAllDebtsPagination")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllDebtsPagination([FromQuery] GetDebtsRequest req)
        {
            var result = await _mediator.Send(req);
            return Ok(result);
        }

        [HttpGet("All")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> All()
        {
            var result = await _mediator.Send(new GetAllDebtsRequest());
            return Ok(result);
        }

        [HttpGet("GetById/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new GetDebtByIdRequest { Id = id });
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }


        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdateDebtRequest request)
        {
            var result = await _mediator.Send(request);
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteDebtRequest { Id = id });
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }
    }
}
