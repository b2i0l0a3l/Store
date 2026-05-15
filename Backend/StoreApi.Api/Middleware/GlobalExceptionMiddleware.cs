using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace StoreApi.Api.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception has occurred while executing the request.");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            if (exception is ValidationException validationException)
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                var errors = validationException.Errors
                    .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
                    .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());

                var problemDetails = new ValidationProblemDetails(errors)
                {
                    Status = (int)HttpStatusCode.BadRequest,
                    Detail = "One or more validation errors occurred."
                };

                return context.Response.WriteAsync(JsonSerializer.Serialize(problemDetails));
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var problemDetails = new ProblemDetails
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Detail = "An unexpected error occurred. Please try again later." 
                };

                return context.Response.WriteAsync(JsonSerializer.Serialize(problemDetails));
            }
        }
    }
}
