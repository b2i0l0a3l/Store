using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StoreSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIpAdressColumnAuditLogTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IpAddress",
                table: "AuditLogs",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IpAddress",
                table: "AuditLogs");
        }
    }
}
