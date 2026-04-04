using Microsoft.AspNetCore.Mvc;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.Models;
using StoreSystem.Core.common;
using StoreSystem.Application.Feature.Messages.Request.Query.Order;
using StoreSystem.Application.Feature.Messages.Request.Command.Order;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;

namespace StoreApi.Api.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/Order")]
    [ApiVersion("1")]

    [Authorize]
    public class OrderController : ApiControllerBase
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

        [HttpGet("All")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> All()
        {
            var result = await _mediator.Send(new GetAllOrdersRequest());
            return Ok(result);
        }

        [HttpGet("GetById/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetById(int id,[FromServices] IAuthorizationService authorizationService)
        {
            var authResult = await authorizationService.AuthorizeAsync(
            User,
            id,
            "ViewerOrderOrAdmin");
            if (!authResult.Succeeded)
            {
                return Forbid();
            }
            var result = await _mediator.Send(new GetOrderByIdRequest { Id = id });
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }


        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] UpdateOrderRequest request)
        {
            var result = await _mediator.Send(request);
            return result.IsSuccess ? Ok() : HandleFailure(result);
        }

        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteOrderRequest { Id = id });
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }

        [HttpGet("GetOrderItemsByOrderId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetOrderItemsByOrderId([FromQuery] GetOrderItemsByOrderIdRequest req)
        {
            var result = await _mediator.Send(req);
            return result.IsSuccess ? Ok() : HandleFailure(result);

        }
        [HttpPost("AddOrderWithItems")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddOrderWithItems([FromBody] AddOrderWithItemsRequest req)
        {
            var result = await _mediator.Send(req);
            return result.IsSuccess ? Ok() : HandleFailure(result);

        }
    }
}

