using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
    {
        public void Configure(EntityTypeBuilder<Supplier> builder)
        {
            builder.HasKey(s => s.Id);

            builder.Property(s => s.Name)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(s => s.PhoneNumber)
                .HasMaxLength(10);

            builder.HasIndex(s => s.Name)
                .HasDatabaseName("IX_Supplier_Name")
                .IsUnique();

            // One Supplier -> Many SupplierProducts
            builder.HasMany(s => s.SupplierProducts)
                .WithOne(sp => sp.Supplier)
                .HasForeignKey(sp => sp.SupplierId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
