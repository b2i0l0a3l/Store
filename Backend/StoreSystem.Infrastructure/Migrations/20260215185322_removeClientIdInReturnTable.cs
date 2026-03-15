using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StoreSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class removeClientIdInReturnTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Returns_Clients_ClientId",
                table: "Returns");

            migrationBuilder.DropIndex(
                name: "IX_Returns_ClientId",
                table: "Returns");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Returns");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Returns",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Returns_ClientId",
                table: "Returns",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Returns_Clients_ClientId",
                table: "Returns",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
