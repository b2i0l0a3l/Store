using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.Entities;
using StoreSystem.Infrastructure.Persistence;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>

    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Product> builder)
        {
            builder.HasIndex(p => p.BarCode).HasDatabaseName("IX_Product_BarCode")
            .IsUnique();
            builder.HasIndex(p => p.Name).HasDatabaseName("IX_Product_Name")
            .IsUnique();

            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Product_Quantity", "Quantity >= 0");
                t.HasCheckConstraint("CK_Product_Price", "Price >= 0");
            });
            
        }
    }
}