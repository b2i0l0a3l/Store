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
using StoreSystem.Core.interfaces.functions.ProductFunctions;
using StoreSystem.Core.interfaces.functions.DebtFunctions;
using StoreSystem.Core.interfaces.functions.ClientFunctions;
using StoreSystem.Infrastructure.presistence.database.functions.ClientFunctions;
using StoreSystem.Core.interfaces.functions.PaymentFunctions;
using StoreSystem.Infrastructure.presistence.database.functions.PaymentFunctions;
using StoreSystem.Infrastructure.presistence.database.procedures.invoiceProcedure;
using StoreSystem.Application.Interface;
using StoreSystem.Infrastructure.Services;

namespace StoreSystem.Infrastructure.shared
{
    public static class InfrastructurServiceRegistration
    {

        public static void AddInfrastructurServiceRegistration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("MyConn")));

            services.AddIdentity<User, Microsoft.AspNetCore.Identity.IdentityRole>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped(typeof(IQueryService<>), typeof(QueryService<>));
            services.AddScoped<IUserRepository, StoreSystem.Infrastructure.presistence.Repo.UserRepository>();

            services.AddScoped<IGenerateJwtToken, GenerateJwtToken>();
            services.AddScoped<IGenerateToken, GenerateRefreshToken>();
            services.AddScoped<IUploadImage, UploadImageLocal>();
            services.AddScoped<IGenerateQrCode, QrCodeGenerator>();
            services.AddScoped<IGenerateInvoiceHtml, GenerateInvoiceHtmlService>();
            services.AddSingleton<IBackgroundTaskQueue, BackgroundTaskQueue>();

            // Procedures
            services.AddScoped<IHandleOrderWithHisItemsProcedure, HandleOrderWithHisItems>();
            services.AddScoped<IInvoiceProcedure, InvoiceProcedure>();
            services.AddScoped<IHandleReturnProcedure, HandleReturn>();
            services.AddScoped<IUpdateOrderItemProcedure, UpdateOrderItem>();
            services.AddScoped<IDeleteOrderItemProcedure, DeleteOrderItem>();
            services.AddScoped<IAddPaymentProcedure, AddPayment>();
            services.AddScoped<IUpdateOrderProcedure, UpdateOrder>();

            // Functions
            services.AddScoped<IGetProductPaginationFucntion, GetProductPagination>();
            services.AddScoped<IGetAllProductsFunction, GetAllProducts>();
            services.AddScoped<ISearchProduct, SearchProductFunction>();
            services.AddScoped<IGetOrderItemPaginationFunction, GetOrderItemByOrderIdFunction>();
            services.AddScoped<IGetOrderCardFunction, GetOrderCardFunction>();
            services.AddScoped<IGetOrderItemPagination, GetOrderItemPagination>();
            services.AddScoped<IGetAllOrdersFunction, GetAllOrders>();
            services.AddScoped<IGetOrderItemsByOrderIdFunc, GetOrderItemByOrderId>();
            services.AddScoped<IGetDebts, GetDebts>();
            services.AddScoped<IFnClientRankingFunction, FnClientRankingFunction>();
            services.AddScoped<IGetOrdersCountFunction, GetOrdersCountFunction>();
            services.AddScoped<IGetProductCountFunction, GetProductCountFunction>();
            services.AddScoped<IGetTotalOrdersFunction, GetTotalOrdersFunction>();
            services.AddScoped<IGetTotalRemainingFunction, GetTotalRemainingFunction>();
            services.AddScoped<IFnGetAllPaymentsFunction, FnGetAllPaymentsFunction>();

            services.AddScoped<IFnLowStockAlertsFunction, FnLowStockAlertsFunction>();
            services.AddScoped<IFnTopSellingProductsFunction, FnTopSellingProductsFunction>();
            services.AddScoped<IFnSalesOverTimeFunction, FnSalesOverTimeFunction>();
            services.AddScoped<IFnRecentOrdersFunction, FnRecentOrdersFunction>();
            services.AddScoped<IFnRecentPaymentsFunction, FnRecentPaymentsFunction>();
            services.AddScoped<IFnCashVsDebtRatioFunction, FnCashVsDebtRatioFunction>();

            services.AddScoped<ILowStockChecker, LowStockChecker>();
        }
    }
}