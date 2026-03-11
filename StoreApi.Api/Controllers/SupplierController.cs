using Microsoft.AspNetCore.Mvc;
using MediatR;
using StoreSystem.Application.Feature.Messages.Request.Query;

namespace StoreApi.Api.Controllers
{
    [Route("api/Supplier")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SupplierController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("All")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> All()
        {
            var result = await _mediator.Send(new GetAllSuppliersRequest());
            return Ok(result);
        }
    }
}
