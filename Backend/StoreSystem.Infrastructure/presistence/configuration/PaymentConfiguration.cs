using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Amount)
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.Property(p => p.Notes)
                .HasMaxLength(500);

            builder.HasIndex(p => p.DebtID)
                .HasDatabaseName("IX_Payment_DebtID");

            builder.HasIndex(p => p.PaymentMethod)
                .HasDatabaseName("IX_Payment_PaymentMethod");

            builder.HasIndex(p => p.PaidAt)
                .HasDatabaseName("IX_Payment_PaidAt");

            // Relationships
            builder.HasOne(p => p.Debt)
                .WithMany()
                .HasForeignKey(p => p.DebtID)
                .OnDelete(DeleteBehavior.Restrict);

            // Constraints
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Payment_Amount", "\"Amount\" >= 0");
            });
        }
    }
}