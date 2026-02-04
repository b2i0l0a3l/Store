using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace StudentManagement.Application.Shared
{
    public static class ApplicationServiceRegistration
    {
        public static void AddApplicationServiceRegistration(this IServiceCollection service,IConfiguration configuration)
        {

            service.AddMediatR(AppDomain.CurrentDomain.GetAssemblies());
            
            service.AddValidatorsFromAssembly(typeof(ApplicationAssemblyMarker).Assembly);
            
            // service.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            
            service.AddAutoMapper(cfg =>
            {
                cfg.AddMaps(typeof(ApplicationAssemblyMarker).Assembly);
            });
        }
    }

    public class ApplicationAssemblyMarker { }

}