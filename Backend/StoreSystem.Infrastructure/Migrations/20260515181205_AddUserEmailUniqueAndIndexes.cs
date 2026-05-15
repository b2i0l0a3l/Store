using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StoreSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUserEmailUniqueAndIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "EmailIndex",
                table: "AspNetUsers");

            migrationBuilder.CreateIndex(
                name: "IX_Return_CreatedAt",
                table: "Returns",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_OrderId_ProductId",
                table: "OrderItems",
                columns: new[] { "OrderId", "ProductId" });

            migrationBuilder.CreateIndex(
                name: "IX_Debt_CreatedAt",
                table: "Debts",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Debt_Remaining",
                table: "Debts",
                column: "Remaining");

            migrationBuilder.CreateIndex(
                name: "IX_Client_PhoneNumber",
                table: "Clients",
                column: "PhoneNumber",
                filter: "\"PhoneNumber\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "AspNetUsers",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_NormalizedEmail",
                table: "AspNetUsers",
                column: "NormalizedEmail",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_Role",
                table: "AspNetUsers",
                column: "Role");

            migrationBuilder.CreateIndex(
                name: "IX_User_UserName",
                table: "AspNetUsers",
                column: "UserName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Return_CreatedAt",
                table: "Returns");

            migrationBuilder.DropIndex(
                name: "IX_OrderItem_OrderId_ProductId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_Debt_CreatedAt",
                table: "Debts");

            migrationBuilder.DropIndex(
                name: "IX_Debt_Remaining",
                table: "Debts");

            migrationBuilder.DropIndex(
                name: "IX_Client_PhoneNumber",
                table: "Clients");

            migrationBuilder.DropIndex(
                name: "IX_User_Email",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_User_NormalizedEmail",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_User_Role",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_User_UserName",
                table: "AspNetUsers");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");
        }
    }
}
