using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class SupplierProductConfiguration : IEntityTypeConfiguration<SupplierProduct>
    {
        public void Configure(EntityTypeBuilder<SupplierProduct> builder)
        {
            builder.HasKey(sp => sp.Id);

            builder.Property(sp => sp.Quantity)
                .IsRequired();

            builder.Property(sp => sp.CostPrice)
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.HasIndex(sp => sp.SupplierId)
                .HasDatabaseName("IX_SupplierProduct_SupplierId");

            builder.HasIndex(sp => sp.ProductId)
                .HasDatabaseName("IX_SupplierProduct_ProductId");

            // Composite unique index to prevent duplicates
            builder.HasIndex(sp => new { sp.SupplierId, sp.ProductId, sp.CreatedAt })
                .HasDatabaseName("IX_SupplierProduct_Supplier_Product_Date");

            // Relationships
            builder.HasOne(sp => sp.Supplier)
                .WithMany(s => s.SupplierProducts)
                .HasForeignKey(sp => sp.SupplierId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(sp => sp.Product)
                .WithMany(p => p.SupplierProducts)
                .HasForeignKey(sp => sp.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            // Constraints
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_SupplierProduct_Quantity", "\"Quantity\" > 0");
                t.HasCheckConstraint("CK_SupplierProduct_CostPrice", "\"CostPrice\" >= 0");
            });
        }
    }
}
