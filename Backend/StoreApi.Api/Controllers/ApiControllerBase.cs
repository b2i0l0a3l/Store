using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreSystem.Core.common;
using StoreSystem.Core.enums;

namespace StoreApi.Api.Controllers
{
    public class ApiControllerBase : ControllerBase
    {
        protected IActionResult HandleFailure(Result result)
        {
            if (result.IsSuccess)
            {
                throw new InvalidOperationException("Cannot handle failure for a successful result.");
            }

            return result.Error?.Type switch
            {
                ErrorType.NotFound => NotFound(new ProblemDetails
                {
                    Status = StatusCodes.Status404NotFound,
                    Title = "Not Found",
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.5.4",
                    Detail = result.Error.Description
                }),
                ErrorType.Validation => BadRequest(new ProblemDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Title = "Validation Error",
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    Detail = result.Error.Description
                }),
                ErrorType.General => BadRequest(new ProblemDetails
                {
                    Status = StatusCodes.Status400BadRequest,
                    Title = "Bad Request",
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    Detail = result.Error.Description
                }),
                ErrorType.Failure => StatusCode(StatusCodes.Status500InternalServerError, new ProblemDetails
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Title = "Internal Server Error",
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                    Detail = result.Error.Description
                }),
                _ => StatusCode(StatusCodes.Status500InternalServerError, new ProblemDetails
                {
                    Status = StatusCodes.Status500InternalServerError,
                    Title = "Internal Server Error",
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                    Detail = result.Error?.Description ?? "An unexpected error occurred."
                })
            };
        }
    }
}
