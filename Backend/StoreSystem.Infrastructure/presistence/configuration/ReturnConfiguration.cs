using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class ReturnConfiguration : IEntityTypeConfiguration<Return>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Return> builder)
        {
            builder.HasIndex(p => p.OrderId).HasDatabaseName("IX_Return_OrderId");

        }
    }
}