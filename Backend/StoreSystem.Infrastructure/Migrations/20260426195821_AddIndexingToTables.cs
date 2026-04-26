using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StoreSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexingToTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Payments_DebtID",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_ClientId",
                table: "Invoices");

            migrationBuilder.RenameIndex(
                name: "IX_Returns_OrderId",
                table: "Returns",
                newName: "IX_Return_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_ClientId",
                table: "Orders",
                newName: "IX_Order_ClientId");

            migrationBuilder.RenameIndex(
                name: "IX_Debts_OrderId",
                table: "Debts",
                newName: "IX_Debt_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Debts_ClientId",
                table: "Debts",
                newName: "IX_Debt_ClientId");

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Returns",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Payments",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PaymentMethod",
                table: "Payments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Clients",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RefreshToken_TokenId",
                table: "RefreshToken",
                column: "TokenId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_BarCode",
                table: "Products",
                column: "BarCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Product_Name",
                table: "Products",
                column: "Name",
                unique: true);

            migrationBuilder.AddCheckConstraint(
                name: "CK_Product_Cost",
                table: "Products",
                sql: "\"Cost\" >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Product_Price",
                table: "Products",
                sql: "\"Price\" >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Product_Quantity",
                table: "Products",
                sql: "\"Quantity\" >= 0");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_DebtID",
                table: "Payments",
                column: "DebtID");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Payment_Amount",
                table: "Payments",
                sql: "\"Amount\" >= 0");

            migrationBuilder.CreateIndex(
                name: "IX_Order_OrderStatus",
                table: "Orders",
                column: "OrderStatus");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Order_OrderStatus",
                table: "Orders",
                sql: "\"OrderStatus\" IN (0, 1, 2)");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Order_OrderType",
                table: "Orders",
                sql: "\"OrderType\" IN (0, 1, 2)");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Order_TotalAmount",
                table: "Orders",
                sql: "\"Total\" >= 0");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_ClientId",
                table: "Invoices",
                column: "ClientId");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Invoice_TotalAmount",
                table: "Invoices",
                sql: "\"Total\" >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Debt_Amount",
                table: "Debts",
                sql: "\"Remaining\" >= 0");

            migrationBuilder.CreateIndex(
                name: "IX_Client_Name",
                table: "Clients",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RefreshToken_TokenId",
                table: "RefreshToken");

            migrationBuilder.DropIndex(
                name: "IX_Product_BarCode",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Product_Name",
                table: "Products");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Product_Cost",
                table: "Products");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Product_Price",
                table: "Products");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Product_Quantity",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Payment_DebtID",
                table: "Payments");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Payment_Amount",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Order_OrderStatus",
                table: "Orders");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Order_OrderStatus",
                table: "Orders");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Order_OrderType",
                table: "Orders");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Order_TotalAmount",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_ClientId",
                table: "Invoices");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Invoice_TotalAmount",
                table: "Invoices");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Debt_Amount",
                table: "Debts");

            migrationBuilder.DropIndex(
                name: "IX_Client_Name",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Returns");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Clients");

            migrationBuilder.RenameIndex(
                name: "IX_Return_OrderId",
                table: "Returns",
                newName: "IX_Returns_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_ClientId",
                table: "Orders",
                newName: "IX_Orders_ClientId");

            migrationBuilder.RenameIndex(
                name: "IX_Debt_OrderId",
                table: "Debts",
                newName: "IX_Debts_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Debt_ClientId",
                table: "Debts",
                newName: "IX_Debts_ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_DebtID",
                table: "Payments",
                column: "DebtID");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_ClientId",
                table: "Invoices",
                column: "ClientId");
        }
    }
}
