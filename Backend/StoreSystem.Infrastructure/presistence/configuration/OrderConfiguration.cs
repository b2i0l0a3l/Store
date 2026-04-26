using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Order> builder)
        {
            builder.HasIndex(p => p.ClientId).HasDatabaseName("IX_Order_ClientId");
            builder.HasIndex(p => p.OrderStatus).HasDatabaseName("IX_Order_OrderStatus");
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Order_TotalAmount", "Total >= 0");
            });
        }
    }
}