using System.Diagnostics;
using System.Security.Claims;
using Serilog;

namespace StoreApi.Api.Middleware
{
    public class AuditMiddleware
    {
        private readonly RequestDelegate _next;

        public AuditMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            await _next(context);
            stopwatch.Stop();

            var userId = context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "Anonymous";
            var ipAddress = context.Request.Headers["X-Forwarded-For"].FirstOrDefault()
                ?? context.Connection.RemoteIpAddress?.ToString() ?? "unknown";

            if (context.Response.StatusCode == 401 || context.Response.StatusCode >= 400)
            {
                Log.Warning(
                    "HTTP {Method} {Path} responded {StatusCode} in {ElapsedMs}ms | User: {UserId} | IP: {IpAddress}",
                    context.Request.Method,
                    context.Request.Path,
                    context.Response.StatusCode,
                    stopwatch.ElapsedMilliseconds,
                    userId,
                    ipAddress);
            }
            else if (context.Request.Method != "GET")
            {
                Log.Information(
                    "HTTP {Method} {Path} responded {StatusCode} in {ElapsedMs}ms | User: {UserId} | IP: {IpAddress}",
                    context.Request.Method,
                    context.Request.Path,
                    context.Response.StatusCode,
                    stopwatch.ElapsedMilliseconds,
                    userId,
                    ipAddress);
            }
        }
    }
}