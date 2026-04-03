using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using StoreSystem.Application.Feature.Messages.Request.Command.Invoice;

namespace StoreApi.Api.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/Ivoice")]
    [ApiVersion("1")]

    public class InvoiceController : ControllerBase
    {
        private readonly IMediator _mediator;

        public InvoiceController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("html-invoice")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> HtmlInvoice([FromBody]InvoiceRequest req)
        {
            var result = await _mediator.Send(req);
            return Ok(result);
        }

    }
}