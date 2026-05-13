using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(p => p.Price)
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.Property(p => p.Cost)
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.Property(p => p.Quantity)
                .IsRequired();

            builder.Property(p => p.BarCode)
                .HasMaxLength(100);

            builder.Property(p => p.ImagePath)
                .HasMaxLength(500);

            builder.HasIndex(p => p.BarCode)
                .HasDatabaseName("IX_Product_BarCode")
                .IsUnique()
                .HasFilter("\"BarCode\" IS NOT NULL");

            builder.HasIndex(p => p.Name)
                .HasDatabaseName("IX_Product_Name")
                .IsUnique();

            builder.HasIndex(p => p.CategoryId)
                .HasDatabaseName("IX_Product_CategoryId");

            // Relationships
            builder.HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(p => p.OrderItems)
                .WithOne(oi => oi.Product)
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(p => p.SupplierProducts)
                .WithOne(sp => sp.Product)
                .HasForeignKey(sp => sp.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            // Constraints
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Product_Quantity", "\"Quantity\" >= 0");
                t.HasCheckConstraint("CK_Product_Price", "\"Price\" >= 0");
                t.HasCheckConstraint("CK_Product_Cost", "\"Cost\" >= 0");
            });
        }
    }
}