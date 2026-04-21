using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StoreApi.Api.Authorization;
using StoreSystem.Application;
using StoreSystem.Infrastructure.shared;

namespace StoreApi.Api.Shared
{
    public static  class StoreApiShared
    {
        public static IServiceCollection AddApiServices(this IServiceCollection Services, IConfiguration Configuration)
        {

            Services.AddInfrastructurServiceRegistration(Configuration);
            Services.AddApplicationServices();
            Services.AddSignalR();
            Services.AddScoped<StoreSystem.Application.Interface.INotificationService, StoreApi.Api.Services.NotificationService>();
            Services.AddScoped<StoreSystem.Application.Interface.IDashboardNotificationService, StoreApi.Api.Services.DashboardNotificationService>();
            Services.AddSingleton<StoreSystem.Application.Interface.IBackgroundTaskQueue, StoreSystem.Application.Interface.BackgroundTaskQueue>();
            Services.AddHostedService<StoreApi.Api.Services.QueuedHostedService>();


            Services.AddJwtServices(Configuration);

            Services.AddCors(options =>
            {
                options.AddPolicy("Allow", policy =>
                {
                    policy.WithOrigins("https://store-three-self.vercel.app", "http://localhost:5107", "http://localhost:3000", "http://127.0.0.1:5500", "http://localhost:5500")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });
            
            Services.AddSwaggerServices();
            return Services;
        }
    }
}