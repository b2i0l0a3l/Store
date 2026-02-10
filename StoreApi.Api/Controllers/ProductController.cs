using Microsoft.AspNetCore.Mvc;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.Models;
using StoreSystem.Core.common;

namespace StoreApi.Api.Controllers
{
    [Route("api/Product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll([FromQuery] GetProductsRequest req)
        {
            var result = await _mediator.Send(req);
            return Ok(result);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new GetProductByIdRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] AddProductRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UpdateProductRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteProductRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }
    }
}
