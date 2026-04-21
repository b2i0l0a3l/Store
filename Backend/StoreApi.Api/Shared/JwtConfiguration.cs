using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using StoreApi.Api.Authorization;

namespace StoreApi.Api.Shared
{
    public static class JwtConfiguration
    {
        public static IServiceCollection AddJwtServices(this IServiceCollection Services, IConfiguration Configuration)
        {


            Services.AddAuthentication(options =>
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
                    ValidIssuer = Configuration["JWT_VALID_ISSUER"],
                    ValidAudience = Configuration["JWT_VALID_AUDIENCE"],
                    ClockSkew = TimeSpan.FromMinutes(5),
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(Configuration["JWT_SECRET"]!)),
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                        {
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });
            
               Services.AddScoped<IAuthorizationHandler, RoleHandler>();
            Services.AddAuthorization(options =>
            {
                options.AddPolicy("ViewerOrderOrAdmin", policy =>
                    policy.Requirements.Add(new RoleRequirement()));
            });

            return Services;
        }
    }
}