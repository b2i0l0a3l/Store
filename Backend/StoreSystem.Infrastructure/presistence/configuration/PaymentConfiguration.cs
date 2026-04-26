using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Payment> builder)
        {
            builder.HasIndex(p => p.DebtID).HasDatabaseName("IX_Payment_DebtID");
            builder.HasIndex(p => p.PaymentMethod).HasDatabaseName("IX_Payment_PaymentMethod");
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Payment_Amount", "Amount >= 0");
            });
        }
    }
}