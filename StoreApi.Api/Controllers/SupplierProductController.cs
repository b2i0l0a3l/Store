using Microsoft.AspNetCore.Mvc;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Command.SupplierProduct;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.Models;
using StoreSystem.Core.common;

namespace StoreApi.Api.Controllers
{
    [Route("api/SupplierProduct")]
    [ApiController]
    public class SupplierProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SupplierProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll([FromQuery] GetSupplierProductsRequest req)
        {
            var result = await _mediator.Send(req);
            return Ok(result);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new GetSupplierProductByIdRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] AddSupplierProductRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateSupplierProductRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteSupplierProductRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPost("ReceiveProduct")]
        public async Task<IActionResult> ReceiveProduct([FromBody] ReceiveSupplierProductRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result);
        }
    }
}

