using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StoreSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateIndexingInPaymentTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Payment_DebtID",
                table: "Payments");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Order_OrderStatus",
                table: "Orders");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Order_OrderType",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_ClientId",
                table: "Invoices");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_DebtID",
                table: "Payments",
                column: "DebtID");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_PaymentMethod",
                table: "Payments",
                column: "PaymentMethod");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_ClientId",
                table: "Invoices",
                column: "ClientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Payment_DebtID",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payment_PaymentMethod",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_ClientId",
                table: "Invoices");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_DebtID",
                table: "Payments",
                column: "DebtID",
                unique: true);

            migrationBuilder.AddCheckConstraint(
                name: "CK_Order_OrderStatus",
                table: "Orders",
                sql: "OrderStatus IN (0, 1, 2)");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Order_OrderType",
                table: "Orders",
                sql: "OrderType IN (0, 1, 2)");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_ClientId",
                table: "Invoices",
                column: "ClientId",
                unique: true);
        }
    }
}
