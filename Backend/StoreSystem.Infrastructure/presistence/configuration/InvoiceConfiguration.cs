using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {
            builder.HasKey(i => i.Id);

            builder.Property(i => i.Id)
                .HasMaxLength(100);

            builder.Property(i => i.Total)
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.HasIndex(i => i.ClientId)
                .HasDatabaseName("IX_Invoice_ClientId");

            builder.HasIndex(i => i.CreatedAt)
                .HasDatabaseName("IX_Invoice_CreatedAt");

            // Relationships
            builder.HasOne(i => i.Client)
                .WithMany(c => c.Invoices)
                .HasForeignKey(i => i.ClientId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasMany(i => i.InvoiceItems)
                .WithOne(ii => ii.Invoice)
                .HasForeignKey(ii => ii.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade);

            // Constraints
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Invoice_TotalAmount", "\"Total\" >= 0");
            });
        }
    }
}