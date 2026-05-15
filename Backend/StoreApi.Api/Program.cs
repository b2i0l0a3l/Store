using Microsoft.Extensions.FileProviders;
using System.Threading.RateLimiting;
using StoreApi.Api.Middleware;
using Asp.Versioning;
using Serilog;

using Microsoft.AspNetCore.Identity;
using StoreSystem.Core.Entities;
using StoreSystem.Infrastructure.HELPER;
using StoreSystem.Application.Feature.Messages.Request.Command.Order;
using MediatR;
using StoreApi.Api.Shared;


Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.EntityFrameworkCore", Serilog.Events.LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}")
    .WriteTo.File("Logs/log-.txt",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 30,
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}")
    .CreateLogger();

try
{
    Log.Information("Starting Store API...");

    var builder = WebApplication.CreateBuilder(args);
    builder.Host.UseSerilog();


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

 
    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("AdminAndStaff", policy =>
            policy.RequireRole("Admin", "Staff"));
    });


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
    app.UseSerilogRequestLogging();
    app.UseMiddleware<AuditMiddleware>();
    app.UseAuthorization();
    app.MapControllers();
    var versionSet = app.NewApiVersionSet()
        .HasApiVersion(new ApiVersion(1, 0))
        .ReportApiVersions()
        .Build(); 

    app.MapPost("api/v{version:apiVersion}/Order/sell", async (AddOrderWithItemsRequest req, IMediator mediator) =>
    {
        var result = await mediator.Send(req);

        return result.IsSuccess
            ? Results.Ok("Done")
            : Results.BadRequest(result);
    })
    .RequireAuthorization("AdminAndStaff")
    .WithApiVersionSet(versionSet)
    .MapToApiVersion(1, 0);
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
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}