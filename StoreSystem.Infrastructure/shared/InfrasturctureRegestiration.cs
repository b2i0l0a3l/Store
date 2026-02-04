using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StoreSystem.Core.interfaces;
using StoreSystem.Infrastructure.Persistence.Repo;

namespace StoreSystem.Infrastructure.shared
{
    public static class InfrastructurServiceRegistration
    {

        public static void AddInfrastructurServiceRegistration(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

        }
    }
}