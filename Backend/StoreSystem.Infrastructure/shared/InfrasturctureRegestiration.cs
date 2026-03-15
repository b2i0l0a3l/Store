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
using StoreSystem.Infrastructure.presistence.database.functions.ProductFunctions;
using StoreSystem.Core.interfaces.functions.OrderFunctions;
using StoreSystem.Core.interfaces.functions;
using StoreSystem.Infrastructure.presistence.database.functions.DebtFunctions;

namespace StoreSystem.Infrastructure.shared
{
    public static class InfrastructurServiceRegistration
    {

        public static void AddInfrastructurServiceRegistration(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration["CONNECTION_STRING"]));

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
            services.AddScoped<IGetProductPaginationFucntion, GetProductPagination>();
            services.AddScoped<IGetAllProductsFunction, GetAllProducts>();
            services.AddScoped<ISearchProduct, SearchProductFunction>();
            services.AddScoped<IGetOrderItemPaginationFunction, GetOrderItemByOrderIdFunction>();
            services.AddScoped<IGetOrderCardFunction, GetOrderCardFunction>();
            services.AddScoped<IGetOrderItemPagination, GetOrderItemPagination>();
            services.AddScoped<IGetAllOrdersFunction, GetAllOrders>();
            services.AddScoped<IGetOrderItemsByOrderIdFunc, GetOrderItemByOrderId>();
            services.AddScoped<IGetDebts, GetDebts>();
        }
    }
}