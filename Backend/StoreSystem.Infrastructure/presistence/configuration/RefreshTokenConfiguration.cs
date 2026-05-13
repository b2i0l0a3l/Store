using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
    {
        public void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            builder.HasKey(rt => rt.Id);

            builder.Property(rt => rt.UserId)
                .IsRequired()
                .HasMaxLength(450);

            builder.Property(rt => rt.TokenId)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(rt => rt.RefreshTokenHash)
                .HasMaxLength(500);

            builder.HasIndex(rt => rt.TokenId)
                .HasDatabaseName("IX_RefreshToken_TokenId")
                .IsUnique();

            builder.HasIndex(rt => rt.UserId)
                .HasDatabaseName("IX_RefreshToken_UserId");

            // Relationships
            builder.HasOne(rt => rt.User)
                .WithMany()
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}