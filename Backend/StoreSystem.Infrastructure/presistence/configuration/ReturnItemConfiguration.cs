using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class ReturnItemConfiguration : IEntityTypeConfiguration<ReturnItem>
    {
        public void Configure(EntityTypeBuilder<ReturnItem> builder)
        {
            builder.HasKey(ri => ri.Id);

            builder.Property(ri => ri.Quantity)
                .IsRequired();

            builder.Property(ri => ri.Price)
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.HasIndex(ri => ri.ReturnId)
                .HasDatabaseName("IX_ReturnItem_ReturnId");

            builder.HasIndex(ri => ri.ProductId)
                .HasDatabaseName("IX_ReturnItem_ProductId");

            // Relationships
            builder.HasOne(ri => ri.Return)
                .WithMany(r => r.ReturnItems)
                .HasForeignKey(ri => ri.ReturnId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(ri => ri.Product)
                .WithMany()
                .HasForeignKey(ri => ri.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            // Constraints
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_ReturnItem_Quantity", "\"Quantity\" > 0");
                t.HasCheckConstraint("CK_ReturnItem_Price", "\"Price\" >= 0");
            });
        }
    }
}
