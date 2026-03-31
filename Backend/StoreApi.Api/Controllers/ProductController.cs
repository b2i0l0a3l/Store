using Microsoft.AspNetCore.Mvc;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Command;
using StoreSystem.Application.Feature.Messages.Request.Query;
using StoreSystem.Core.Models;
using StoreSystem.Core.common;
using Microsoft.AspNetCore.Authorization;
using BookingSystem.Core.common;
using StoreSystem.Application.Interface;
using StoreApi.Api.Contract.Product;

namespace StoreApi.Api.Controllers
{
    [Route("api/Product")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private IUploadProductImage _UploadImage;
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator,IUploadProductImage UploadImage)
        {
            _mediator = mediator;
            _UploadImage = UploadImage;
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll([FromQuery] GetProductsRequest req)
        {
            var result = await _mediator.Send(req);
            return Ok(result);
        }

        [HttpGet("All")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> All()
        {
            var result = await _mediator.Send(new GetAllProductsRequest());
            return Ok(result);
        }

        [HttpGet("GetById/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new GetProductByIdRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPost("Add")]
        [Consumes("multipart/form-data")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Add(AddProduct req)
        {
            AddProductRequest request = new()
            {
                CategoryId = req.CategoryId,
                CodeBar = req.CodeBar ?? null,
                Cost = req.Cost,
                Price = req.Price,
                Name = req.Name,
                Quantity = req.Quantity,
            };

            if (req.ProductImage != null && req.ProductImage.Length != 0)
            {
                using var stream = req.ProductImage.OpenReadStream();
                request.ImagePath = await _UploadImage.Upload(stream, req.ProductImage.FileName);
            }
            
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpPut("Update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdateProductRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }

        [HttpDelete("Delete/{id}")]
        [Authorize(Roles = Roles.Admin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteProductRequest { Id = id });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
            return Ok(result.Value);
        }
    }
}
