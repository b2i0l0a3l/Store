using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Invoice> builder)
        {
            builder.HasIndex(p => p.ClientId).HasDatabaseName("IX_Invoice_ClientId");
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Invoice_TotalAmount", "Total >= 0");
            });
        }
        
    }
}