using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StoreSystem.Core.Entities;

namespace StoreSystem.Infrastructure.presistence.configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(u => u.FullName)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(u => u.Role)
                .HasMaxLength(20);

            builder.Property(u => u.ImagePath)
                .HasMaxLength(500);

            builder.HasIndex(u => u.Email)
                .HasDatabaseName("IX_User_Email")
                .IsUnique();

            builder.HasIndex(u => u.NormalizedEmail)
                .HasDatabaseName("IX_User_NormalizedEmail")
                .IsUnique();

            builder.HasIndex(u => u.UserName)
                .HasDatabaseName("IX_User_UserName")
                .IsUnique();

            builder.HasIndex(u => u.Role)
                .HasDatabaseName("IX_User_Role");
        }
    }
}
