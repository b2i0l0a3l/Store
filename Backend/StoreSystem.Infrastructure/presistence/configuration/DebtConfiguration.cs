using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class DebtConfiguration : IEntityTypeConfiguration<Debt>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Debt> builder)
        {
            builder.HasIndex(p => p.ClientId).HasDatabaseName("IX_Debt_ClientId");
            builder.HasIndex(p => p.OrderId).HasDatabaseName("IX_Debt_OrderId");
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Debt_Amount", "Amount >= 0");
            });
        }
        
    }
}