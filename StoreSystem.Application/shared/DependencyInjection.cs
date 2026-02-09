using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using StoreSystem.Application.Common.Behaviors;
using StoreSystem.Application.Interface;
using StoreSystem.Application.shared;
using System.Reflection;

namespace StoreSystem.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();
            services.AddScoped<IGenerateJwtToken,GenerateJwtToken>();
            services.AddScoped<IGenerateRefreshToken, GenerateRefreshToken>();
            services.AddAutoMapper(assembly);
            services.AddValidatorsFromAssembly(assembly);
            services.AddMediatR(assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            return services;
        }
    }
}
