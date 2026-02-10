using Microsoft.AspNetCore.Mvc;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Command.OrderWithITem;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.Models;
using StoreSystem.Core.common;

namespace StoreApi.Api.Controllers
{
    [Route("api/Order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrderController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll([FromQuery]GetOrdersRequest req)
        {
            var result = await _mediator.Send(req);
            return Ok(result);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new GetOrderByIdRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPost("Add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Add([FromBody] AddOrderRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] UpdateOrderRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteOrderRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPost("AddOrderWithItems")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddOrderWithItems([FromBody]AddOrderWithItemRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result);
        }
    }
}

