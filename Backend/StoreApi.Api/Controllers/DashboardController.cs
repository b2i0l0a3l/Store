using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using StoreSystem.Application.Feature.Messages.Request.Query.Dashboard;

namespace StoreApi.Api.Controllers
{
    [Route("api/Dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DashboardController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("Summary")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSummary()
        {
            var result = await _mediator.Send(new GetDashboardSummaryQuery());
            if (!result.IsSuccess)
                return BadRequest(result.Error);
                
            return Ok(result.Value);
        }

        [HttpGet("ClientRanking")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetClientRanking()
        {
            var result = await _mediator.Send(new GetClientRankingQuery());
            if (!result.IsSuccess)
                return BadRequest(result.Error);
                
            return Ok(result.Value);
        }

        [HttpGet("LowStockAlerts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLowStockAlerts()
        {
            var result = await _mediator.Send(new GetLowStockAlertsQuery());
            if (!result.IsSuccess)
                return BadRequest(result.Error);
                
            return Ok(result.Value);
        }

        [HttpGet("TopSellingProducts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTopSellingProducts()
        {
            var result = await _mediator.Send(new GetTopSellingProductsQuery());
            if (!result.IsSuccess)
                return BadRequest(result.Error);
                
            return Ok(result.Value);
        }

        [HttpGet("SalesOverTime")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSalesOverTime([FromQuery] int days = 30)
        {
            var result = await _mediator.Send(new GetSalesOverTimeQuery { Days = days });
            if (!result.IsSuccess)
                return BadRequest(result.Error);
                
            return Ok(result.Value);
        }

        [HttpGet("RecentActivities")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetRecentActivities()
        {
            var result = await _mediator.Send(new GetRecentActivitiesQuery());
            if (!result.IsSuccess)
                return BadRequest(result.Error);
                
            return Ok(result.Value);
        }

        [HttpGet("CashVsDebtRatio")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCashVsDebtRatio()
        {
            var result = await _mediator.Send(new GetCashVsDebtRatioQuery());
            if (!result.IsSuccess)
                return BadRequest(result.Error);
                
            return Ok(result.Value);
        }
    }
}
