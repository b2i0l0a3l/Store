using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasKey(oi => oi.Id);

            builder.Property(oi => oi.Price)
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.Property(oi => oi.Quantity)
                .IsRequired();

            builder.HasIndex(oi => oi.OrderId)
                .HasDatabaseName("IX_OrderItem_OrderId");

            builder.HasIndex(oi => oi.ProductId)
                .HasDatabaseName("IX_OrderItem_ProductId");

            builder.HasIndex(oi => new { oi.OrderId, oi.ProductId })
                .HasDatabaseName("IX_OrderItem_OrderId_ProductId");

            // Relationships
            builder.HasOne(oi => oi.Order)
                .WithMany()
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(oi => oi.Product)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            // Constraints
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_OrderItem_Price", "\"Price\" >= 0");
                t.HasCheckConstraint("CK_OrderItem_Quantity", "\"Quantity\" > 0");
            });
        }
    }
}
