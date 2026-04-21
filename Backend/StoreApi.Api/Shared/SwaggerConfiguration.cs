using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.OpenApi.Models;

namespace StoreApi.Api.Shared
{
    public static class SwaggerConfiguration
    {
        public static IServiceCollection AddSwaggerServices(this IServiceCollection Services)
        {
             Services.AddApiVersioning(options =>
            {
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.DefaultApiVersion = new Asp.Versioning.ApiVersion(1, 0);
                options.ReportApiVersions = true;
            }).AddApiExplorer(options =>
            {
                options.GroupNameFormat = "'v'VVV";
                options.SubstituteApiVersionInUrl = true;
            });
            Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",
                    new OpenApiInfo
                    {
                        Title = "Store API - V1",
                        Version = "v1",
                        Description = "Store Management API ",
                        TermsOfService = new Uri("http://tempuri.org/terms"),
                        Contact = new OpenApiContact
                        {
                            Name = "Bilal",
                            Email = "belamraoui21@gmail.com"
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

            return Services;
        }
        
    }
}