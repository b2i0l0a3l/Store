using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StoreSystem.Core.Entities;
using StoreSystem.Core.interfaces;
using StoreSystem.Infrastructure.Persistence;
using StoreSystem.Infrastructure.Persistence.Repo;
using StoreSystem.Infrastructure.presistence.database.procedures;
using StoreSystem.Infrastructure.presistence.database.functions;
using StoreSystem.Infrastructure.presistence.database.functions.OrderItemFunctions;
using StoreSystem.Infrastructure.presistence.database.functions.OrderFunctions;

namespace StoreSystem.Infrastructure.shared
{
    public static class InfrastructurServiceRegistration
    {

        public static void AddInfrastructurServiceRegistration(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<User, Microsoft.AspNetCore.Identity.IdentityRole>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IHandleOrderWithHisItemsProcedure, HandleOrderWithHisItems>();
            services.AddScoped<IHandleReturnProcedure, HandleReturn>();
            services.AddScoped<IUpdateOrderItemProcedure, UpdateOrderItem>();
            services.AddScoped<IDeleteOrderItemProcedure, DeleteOrderItem>();
            services.AddScoped<IAddPaymentProcedure, AddPayment>();
            services.AddScoped<IUpdateOrderProcedure, UpdateOrder>();
            services.AddScoped<IGetProductsFucntion, GetProducts>();
            services.AddScoped<IGetOrderItemFunction, GetOrderItemByOrderIdFunction>();
            services.AddScoped<IGetOrderCardFunction, GetOrderCardFunction>();
            
        }
    }
}