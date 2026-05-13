using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(o => o.Id);

            builder.Property(o => o.Total)
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.HasIndex(o => o.ClientId)
                .HasDatabaseName("IX_Order_ClientId");

            builder.HasIndex(o => o.OrderStatus)
                .HasDatabaseName("IX_Order_OrderStatus");

            builder.HasIndex(o => o.CreatedAt)
                .HasDatabaseName("IX_Order_CreatedAt");

            // Relationships
            builder.HasOne(o => o.Client)
                .WithMany(c => c.Orders)
                .HasForeignKey(o => o.ClientId)
                .OnDelete(DeleteBehavior.SetNull);

            // Constraints
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Order_TotalAmount", "\"Total\" >= 0");
            });
        }
    }
}