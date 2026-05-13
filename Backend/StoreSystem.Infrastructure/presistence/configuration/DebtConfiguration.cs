using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class DebtConfiguration : IEntityTypeConfiguration<Debt>
    {
        public void Configure(EntityTypeBuilder<Debt> builder)
        {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.Remaining)
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.HasIndex(d => d.ClientId)
                .HasDatabaseName("IX_Debt_ClientId");

            builder.HasIndex(d => d.OrderId)
                .HasDatabaseName("IX_Debt_OrderId");

            // Relationships
            builder.HasOne(d => d.Client)
                .WithMany(c => c.Debts)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(d => d.Order)
                .WithMany()
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.Restrict);

            // Constraints
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Debt_Remaining", "\"Remaining\" >= 0");
            });
        }
    }
}