using Microsoft.Extensions.FileProviders;
using System.Threading.RateLimiting;
using StoreApi.Api.Middleware;
using Asp.Versioning;

using Microsoft.AspNetCore.Identity;
using StoreSystem.Core.Entities;
using StoreSystem.Infrastructure.HELPER;
using StoreSystem.Application.Feature.Messages.Request.Command.Order;
using MediatR;
using StoreApi.Api.Shared;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddPolicy("AuthLimiter", httpContext =>
    {
        var ip = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        return RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: ip,
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            });
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddApiServices(builder.Configuration);





var app = builder.Build();



app.UseSwagger();
app.UseSwaggerUI();



app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseHttpsRedirection();

var assetsPath = Path.Combine(Directory.GetCurrentDirectory(), "Assets");
if (!Directory.Exists(assetsPath))
{
    Directory.CreateDirectory(assetsPath);
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(assetsPath),
    RequestPath = "/Assets"
});


app.UseRouting();
app.UseCors("Allow"); 

app.UseRateLimiter();
app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == StatusCodes.Status429TooManyRequests)
    {
        await context.Response.WriteAsync("Too many login attempts. Please try again later.");
    }
});

app.UseAuthentication(); 
app.UseMiddleware<AuditMiddleware>();
app.UseAuthorization();
app.MapControllers();
app.MapPost("api/v{version:apiVersion}/sell", async (AddOrderWithItemsRequest req, IMediator mediator) =>
{
    var result = await mediator.Send(req);

    return result.IsSuccess
        ? Results.Ok()
        : Results.BadRequest(result);
});
app.MapHub<StoreApi.Api.Hubs.NotificationHub>("/hubs/notifications");
app.MapHub<StoreApi.Api.Hubs.DashboardHub>("/hubs/dashboard");

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var userManager = services.GetRequiredService<UserManager<User>>();
    var RoleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    var config = services.GetRequiredService<IConfiguration>();
    await RoleSeeder.SeedRolesAsync(RoleManager);
    await DbSeeder.SeedAdminAsync(userManager, config);
}
app.Run();