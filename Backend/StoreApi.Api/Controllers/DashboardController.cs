using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using StoreSystem.Application.Feature.Messages.Request.Query.Dashboard;
using BookingSystem.Core.common;
using Asp.Versioning;

namespace StoreApi.Api.Controllers
{

    [ApiController]
    [Route("api/v{version:apiVersion}/Dashboard")]
    [ApiVersion("1")]
    [Authorize(Roles =Roles.Admin)]
    public class DashboardController : ApiControllerBase
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
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }

        [HttpGet("ClientRanking")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetClientRanking()
        {
            var result = await _mediator.Send(new GetClientRankingQuery());
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }

        [HttpGet("LowStockAlerts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLowStockAlerts()
        {
            var result = await _mediator.Send(new GetLowStockAlertsQuery());
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }

        [HttpGet("TopSellingProducts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTopSellingProducts()
        {
            var result = await _mediator.Send(new GetTopSellingProductsQuery());
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }

        [HttpGet("SalesOverTime")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSalesOverTime([FromQuery] int days = 30)
        {
            var result = await _mediator.Send(new GetSalesOverTimeQuery { Days = days });
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }

        [HttpGet("RecentActivities")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetRecentActivities()
        {
            var result = await _mediator.Send(new GetRecentActivitiesQuery());
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }

        [HttpGet("CashVsDebtRatio")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCashVsDebtRatio()
        {
            var result = await _mediator.Send(new GetCashVsDebtRatioQuery());
            return result.IsSuccess ? Ok(result.Value) : HandleFailure(result);
        }
    }
}
