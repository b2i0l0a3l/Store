using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class InvoiceItemConfiguration : IEntityTypeConfiguration<InvoiceItem>
    {
        public void Configure(EntityTypeBuilder<InvoiceItem> builder)
        {
            builder.HasKey(ii => ii.Id);

            builder.Property(ii => ii.InvoiceId)
                .IsRequired();

            builder.Property(ii => ii.productName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(ii => ii.quantity)
                .IsRequired();

            builder.Property(ii => ii.price)
                .IsRequired();

            builder.HasIndex(ii => ii.InvoiceId)
                .HasDatabaseName("IX_InvoiceItem_InvoiceId");

            // Relationships
            builder.HasOne(ii => ii.Invoice)
                .WithMany(i => i.InvoiceItems)
                .HasForeignKey(ii => ii.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade);

            // Constraints
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_InvoiceItem_Quantity", "quantity > 0");
                t.HasCheckConstraint("CK_InvoiceItem_Price", "price >= 0");
            });
        }
    }
}
