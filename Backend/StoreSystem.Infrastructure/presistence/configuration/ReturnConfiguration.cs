using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class ReturnConfiguration : IEntityTypeConfiguration<Return>
    {
        public void Configure(EntityTypeBuilder<Return> builder)
        {
            builder.HasKey(r => r.Id);

            builder.Property(r => r.OrderId)
                .IsRequired();

            builder.Property(r => r.TotalRefund)
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.Property(r => r.Notes)
                .HasMaxLength(200);

            builder.HasIndex(r => r.OrderId)
                .HasDatabaseName("IX_Return_OrderId");

            builder.HasIndex(r => r.CreatedAt)
                .HasDatabaseName("IX_Return_CreatedAt");

            // Relationships
            builder.HasOne(r => r.Order)
                .WithMany()
                .HasForeignKey(r => r.OrderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(r => r.ReturnItems)
                .WithOne(ri => ri.Return)
                .HasForeignKey(ri => ri.ReturnId)
                .OnDelete(DeleteBehavior.Cascade);

            // Constraints
            builder.ToTable(t =>
            {
                t.HasCheckConstraint("CK_Return_TotalRefund", "\"TotalRefund\" >= 0");
            });
        }
    }
}