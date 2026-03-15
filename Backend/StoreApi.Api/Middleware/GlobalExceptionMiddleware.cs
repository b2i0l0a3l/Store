using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public GlobalExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
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
                    Title = "Validation Failure",
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
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
                    Title = "An error occurred while processing your request.",
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                    Detail = exception.Message 
                };

                return context.Response.WriteAsync(JsonSerializer.Serialize(problemDetails));
            }
        }
    }
}
