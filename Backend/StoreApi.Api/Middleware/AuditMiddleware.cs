using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;

namespace StoreApi.Api.Middleware
{
    public class AuditMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<AuditMiddleware> _logger;
        public AuditMiddleware(RequestDelegate next, ILogger<AuditMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context,IRepository<AuditLog> _Repo)
        {
            DateTime StartAt = DateTime.UtcNow;
            await _next(context);
            DateTime EndAt = DateTime.UtcNow;
            TimeSpan Duration = EndAt - StartAt;

            
            if (context.Request.Method != "GET")
            {
                var userId = context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                var ipAddress = context.Request.Headers["X-Forwarded-For"].FirstOrDefault();

                if (string.IsNullOrEmpty(ipAddress))
                {
                    ipAddress = context.Connection.RemoteIpAddress?.ToString();
                }


                AuditLog log = new()
                {
                    UserId = userId ?? "Anonymous",
                    Method = context.Request.Method,
                    Endpoint = context.Request.Path,
                    IpAddress = ipAddress,
                    StatusCode = context.Response.StatusCode,

                };

                await _Repo.Add(log);  
            }
            
            if(context.Response.StatusCode == 401 || context.Response.StatusCode == 400)
                _logger.LogWarning("Request {method} {path} responded {status}  time: {Duration} seconds",
                context.Request.Method,
                context.Request.Path,
                context.Response.StatusCode, Duration.Seconds);
            else
                _logger.LogInformation(
                    "Request {method} {path} responded {status}  time: {Duration} seconds",
                    context.Request.Method,
                    context.Request.Path,
                    context.Response.StatusCode, Duration.Seconds);
        }

    }
}