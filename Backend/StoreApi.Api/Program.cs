
using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using StoreSystem.Application;
using StoreApi.Api.Middleware;
using StoreSystem.Infrastructure.shared;

using Microsoft.OpenApi.Models;

var currentDir = Directory.GetCurrentDirectory();
while (currentDir != null && !File.Exists(Path.Combine(currentDir, ".env")))
{
    currentDir = Directory.GetParent(currentDir)?.FullName;
}

if (currentDir != null)
{
    DotNetEnv.Env.Load(Path.Combine(currentDir, ".env"));
}

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

builder.Services.AddInfrastructurServiceRegistration(builder.Configuration);
builder.Services.AddApplicationServices();


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT_VALID_ISSUER"],
        ValidAudience = builder.Configuration["JWT_VALID_AUDIENCE"],
        ClockSkew = TimeSpan.FromMinutes(5),
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JWT_SECRET"]!)),
    };
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("Allow", policy =>
    {
        policy.WithOrigins("http://localhost:5107","http://localhost:3000","http://127.0.0.1:5500", "http://localhost:5500")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1",
        new OpenApiInfo
        {
            Title = "Store API - V1",
            Version = "v1",
            Description = "A sample Student Management API ",
            TermsOfService = new Uri("http://tempuri.org/terms"),
            Contact = new OpenApiContact
            {
                Name = "Bilal",
                Email = "belamraoui92@gmail.com"
            },
            License = new OpenApiLicense
            {
                Name = "Apache 2.0",
                Url = new Uri("https://www.apache.org/licenses/LICENSE-2.0.html")
            }
                
        }
    );
    c.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "JWT Authorization header using the Bearer scheme."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        [new OpenApiSecurityScheme { Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "bearer" } }] = []
    });
});






var app = builder.Build();



    app.UseSwagger();
    app.UseSwaggerUI();



app.UseHttpsRedirection();
app.UseRateLimiter();

app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == StatusCodes.Status429TooManyRequests)
    {
        await context.Response.WriteAsync("Too many login attempts. Please try again later.");
    }
});

app.UseRouting();
app.UseCors("Allow"); 

app.UseAuthentication(); 
app.UseAuthorization();
app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseMiddleware<AuditMiddleware>();
app.MapControllers();
app.Run();