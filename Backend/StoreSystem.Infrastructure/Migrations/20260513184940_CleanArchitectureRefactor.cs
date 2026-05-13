using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StoreSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CleanArchitectureRefactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Debts_Clients_ClientId",
                table: "Debts");

            migrationBuilder.DropForeignKey(
                name: "FK_Debts_Orders_OrderId",
                table: "Debts");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Clients_ClientId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Products_ProductId",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Clients_ClientId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Debts_DebtID",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Category_CategoryId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ReturnItems_Products_ProductId",
                table: "ReturnItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Returns_Orders_OrderId",
                table: "Returns");

            migrationBuilder.DropForeignKey(
                name: "FK_SupplierProducts_Products_ProductId",
                table: "SupplierProducts");

            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropIndex(
                name: "IX_Product_BarCode",
                table: "Products");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Product_Price",
                table: "Products");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Product_Quantity",
                table: "Products");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Payment_Amount",
                table: "Payments");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Order_TotalAmount",
                table: "Orders");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Invoice_TotalAmount",
                table: "Invoices");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Debt_Amount",
                table: "Debts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Category",
                table: "Category");

            migrationBuilder.RenameTable(
                name: "Category",
                newName: "Categories");

            migrationBuilder.RenameIndex(
                name: "IX_SupplierProducts_SupplierId",
                table: "SupplierProducts",
                newName: "IX_SupplierProduct_SupplierId");

            migrationBuilder.RenameIndex(
                name: "IX_SupplierProducts_ProductId",
                table: "SupplierProducts",
                newName: "IX_SupplierProduct_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ReturnItems_ReturnId",
                table: "ReturnItems",
                newName: "IX_ReturnItem_ReturnId");

            migrationBuilder.RenameIndex(
                name: "IX_ReturnItems_ProductId",
                table: "ReturnItems",
                newName: "IX_ReturnItem_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                newName: "IX_Product_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems",
                newName: "IX_OrderItem_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                newName: "IX_OrderItem_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_InvoiceItems_InvoiceId",
                table: "InvoiceItems",
                newName: "IX_InvoiceItem_InvoiceId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "RefreshToken",
                type: "character varying(450)",
                maxLength: 450,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "TokenId",
                table: "RefreshToken",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "RefreshTokenHash",
                table: "RefreshToken",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ImagePath",
                table: "Products",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BarCode",
                table: "Products",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "Payments",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Notifications",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "RelatedEntityType",
                table: "Notifications",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RelatedEntityId",
                table: "Notifications",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Notifications",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<bool>(
                name: "IsRead",
                table: "Notifications",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<decimal>(
                name: "Total",
                table: "Invoices",
                type: "numeric(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Invoices",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "productName",
                table: "InvoiceItems",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "InvoiceId",
                table: "InvoiceItems",
                type: "character varying(100)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Clients",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "AspNetUsers",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "ImagePath",
                table: "AspNetUsers",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Supplier_Name",
                table: "Suppliers",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SupplierProduct_Supplier_Product_Date",
                table: "SupplierProducts",
                columns: new[] { "SupplierId", "ProductId", "CreatedAt" });

            migrationBuilder.AddCheckConstraint(
                name: "CK_SupplierProduct_CostPrice",
                table: "SupplierProducts",
                sql: "\"CostPrice\" >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_SupplierProduct_Quantity",
                table: "SupplierProducts",
                sql: "\"Quantity\" > 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Return_TotalRefund",
                table: "Returns",
                sql: "\"TotalRefund\" >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_ReturnItem_Price",
                table: "ReturnItems",
                sql: "\"Price\" >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_ReturnItem_Quantity",
                table: "ReturnItems",
                sql: "\"Quantity\" > 0");

            migrationBuilder.CreateIndex(
                name: "IX_Product_BarCode",
                table: "Products",
                column: "BarCode",
                unique: true,
                filter: "\"BarCode\" IS NOT NULL");

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
                name: "IX_Payment_PaidAt",
                table: "Payments",
                column: "PaidAt");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Payment_Amount",
                table: "Payments",
                sql: "\"Amount\" >= 0");

            migrationBuilder.CreateIndex(
                name: "IX_Order_CreatedAt",
                table: "Orders",
                column: "CreatedAt");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Order_TotalAmount",
                table: "Orders",
                sql: "\"Total\" >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_OrderItem_Price",
                table: "OrderItems",
                sql: "\"Price\" >= 0");

            migrationBuilder.Sql("UPDATE \"OrderItems\" SET \"Quantity\" = 1 WHERE \"Quantity\" <= 0;");

            migrationBuilder.AddCheckConstraint(
                name: "CK_OrderItem_Quantity",
                table: "OrderItems",
                sql: "\"Quantity\" > 0");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_CreatedAt",
                table: "Notifications",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_IsRead",
                table: "Notifications",
                column: "IsRead");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_Type",
                table: "Notifications",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_CreatedAt",
                table: "Invoices",
                column: "CreatedAt");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Invoice_TotalAmount",
                table: "Invoices",
                sql: "\"Total\" >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_InvoiceItem_Price",
                table: "InvoiceItems",
                sql: "price >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_InvoiceItem_Quantity",
                table: "InvoiceItems",
                sql: "quantity > 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Debt_Remaining",
                table: "Debts",
                sql: "\"Remaining\" >= 0");

            migrationBuilder.CreateIndex(
                name: "IX_Category_Name",
                table: "Categories",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Debts_Clients_ClientId",
                table: "Debts",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Debts_Orders_OrderId",
                table: "Debts",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Clients_ClientId",
                table: "Invoices",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Products_ProductId",
                table: "OrderItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Clients_ClientId",
                table: "Orders",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Debts_DebtID",
                table: "Payments",
                column: "DebtID",
                principalTable: "Debts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReturnItems_Products_ProductId",
                table: "ReturnItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Returns_Orders_OrderId",
                table: "Returns",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SupplierProducts_Products_ProductId",
                table: "SupplierProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Debts_Clients_ClientId",
                table: "Debts");

            migrationBuilder.DropForeignKey(
                name: "FK_Debts_Orders_OrderId",
                table: "Debts");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Clients_ClientId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Products_ProductId",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Clients_ClientId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Debts_DebtID",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ReturnItems_Products_ProductId",
                table: "ReturnItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Returns_Orders_OrderId",
                table: "Returns");

            migrationBuilder.DropForeignKey(
                name: "FK_SupplierProducts_Products_ProductId",
                table: "SupplierProducts");

            migrationBuilder.DropIndex(
                name: "IX_Supplier_Name",
                table: "Suppliers");

            migrationBuilder.DropIndex(
                name: "IX_SupplierProduct_Supplier_Product_Date",
                table: "SupplierProducts");

            migrationBuilder.DropCheckConstraint(
                name: "CK_SupplierProduct_CostPrice",
                table: "SupplierProducts");

            migrationBuilder.DropCheckConstraint(
                name: "CK_SupplierProduct_Quantity",
                table: "SupplierProducts");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Return_TotalRefund",
                table: "Returns");

            migrationBuilder.DropCheckConstraint(
                name: "CK_ReturnItem_Price",
                table: "ReturnItems");

            migrationBuilder.DropCheckConstraint(
                name: "CK_ReturnItem_Quantity",
                table: "ReturnItems");

            migrationBuilder.DropIndex(
                name: "IX_Product_BarCode",
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
                name: "IX_Payment_PaidAt",
                table: "Payments");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Payment_Amount",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Order_CreatedAt",
                table: "Orders");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Order_TotalAmount",
                table: "Orders");

            migrationBuilder.DropCheckConstraint(
                name: "CK_OrderItem_Price",
                table: "OrderItems");

            migrationBuilder.DropCheckConstraint(
                name: "CK_OrderItem_Quantity",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_CreatedAt",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_IsRead",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_Type",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_CreatedAt",
                table: "Invoices");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Invoice_TotalAmount",
                table: "Invoices");

            migrationBuilder.DropCheckConstraint(
                name: "CK_InvoiceItem_Price",
                table: "InvoiceItems");

            migrationBuilder.DropCheckConstraint(
                name: "CK_InvoiceItem_Quantity",
                table: "InvoiceItems");

            migrationBuilder.DropCheckConstraint(
                name: "CK_Debt_Remaining",
                table: "Debts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Category_Name",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "Category");

            migrationBuilder.RenameIndex(
                name: "IX_SupplierProduct_SupplierId",
                table: "SupplierProducts",
                newName: "IX_SupplierProducts_SupplierId");

            migrationBuilder.RenameIndex(
                name: "IX_SupplierProduct_ProductId",
                table: "SupplierProducts",
                newName: "IX_SupplierProducts_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ReturnItem_ReturnId",
                table: "ReturnItems",
                newName: "IX_ReturnItems_ReturnId");

            migrationBuilder.RenameIndex(
                name: "IX_ReturnItem_ProductId",
                table: "ReturnItems",
                newName: "IX_ReturnItems_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Product_CategoryId",
                table: "Products",
                newName: "IX_Products_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItem_ProductId",
                table: "OrderItems",
                newName: "IX_OrderItems_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItem_OrderId",
                table: "OrderItems",
                newName: "IX_OrderItems_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_InvoiceItem_InvoiceId",
                table: "InvoiceItems",
                newName: "IX_InvoiceItems_InvoiceId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "RefreshToken",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(450)",
                oldMaxLength: 450);

            migrationBuilder.AlterColumn<string>(
                name: "TokenId",
                table: "RefreshToken",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "RefreshTokenHash",
                table: "RefreshToken",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ImagePath",
                table: "Products",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BarCode",
                table: "Products",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "Payments",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Notifications",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "RelatedEntityType",
                table: "Notifications",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RelatedEntityId",
                table: "Notifications",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Notifications",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<bool>(
                name: "IsRead",
                table: "Notifications",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<decimal>(
                name: "Total",
                table: "Invoices",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Invoices",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "productName",
                table: "InvoiceItems",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "InvoiceId",
                table: "InvoiceItems",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(100)");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Clients",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "ImagePath",
                table: "AspNetUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Category",
                table: "Category",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "AuditLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Endpoint = table.Column<string>(type: "text", nullable: false),
                    IpAddress = table.Column<string>(type: "text", nullable: true),
                    Method = table.Column<string>(type: "text", nullable: false),
                    StatusCode = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Product_BarCode",
                table: "Products",
                column: "BarCode",
                unique: true);

            migrationBuilder.AddCheckConstraint(
                name: "CK_Product_Price",
                table: "Products",
                sql: "Price >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Product_Quantity",
                table: "Products",
                sql: "Quantity >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Payment_Amount",
                table: "Payments",
                sql: "Amount >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Order_TotalAmount",
                table: "Orders",
                sql: "Total >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Invoice_TotalAmount",
                table: "Invoices",
                sql: "Total >= 0");

            migrationBuilder.AddCheckConstraint(
                name: "CK_Debt_Amount",
                table: "Debts",
                sql: "Amount >= 0");

            migrationBuilder.AddForeignKey(
                name: "FK_Debts_Clients_ClientId",
                table: "Debts",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Debts_Orders_OrderId",
                table: "Debts",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Clients_ClientId",
                table: "Invoices",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Products_ProductId",
                table: "OrderItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Clients_ClientId",
                table: "Orders",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Debts_DebtID",
                table: "Payments",
                column: "DebtID",
                principalTable: "Debts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Category_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReturnItems_Products_ProductId",
                table: "ReturnItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Returns_Orders_OrderId",
                table: "Returns",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SupplierProducts_Products_ProductId",
                table: "SupplierProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
