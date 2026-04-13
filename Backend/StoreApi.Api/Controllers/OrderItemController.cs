using Microsoft.AspNetCore.Mvc;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.Models;
using StoreSystem.Core.common;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;
using BookingSystem.Core.common;

namespace StoreApi.Api.Controllers
{
    [ApiController]
            [Route("api/v{version:apiVersion}/OrderItem")]
    [ApiVersion("1")]


    [Authorize]
    public class OrderItemController : ApiControllerBase
    {
        private readonly IMediator _mediator;

        public OrderItemController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll([FromQuery] GetOrderItemsRequest req)
        {
            var result = await _mediator.Send(req);
            return Ok(result);
        }

        [HttpGet("All")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> All()
        {
            var result = await _mediator.Send(new GetAllOrderItemsRequest());
            return Ok(result);
        }

        [HttpGet("GetById/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new GetOrderItemByIdRequest { Id = id });
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }


        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        
        public async Task<IActionResult> Update([FromBody] UpdateOrderItemRequest request)
        {
            var result = await _mediator.Send(request);
            return result.IsSuccess ? Ok() : HandleFailure(result);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteOrderItemRequest { Id = id });
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }
    }
}
