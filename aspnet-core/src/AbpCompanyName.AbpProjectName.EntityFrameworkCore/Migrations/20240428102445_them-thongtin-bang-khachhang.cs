using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbpCompanyName.AbpProjectName.Migrations
{
    /// <inheritdoc />
    public partial class themthongtinbangkhachhang : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GiaoDich",
                schema: "gold");

            migrationBuilder.AddColumn<string>(
                name: "Facebook",
                table: "KHACHHANG",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoTienConNo",
                table: "KHACHHANG",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoTienConThua",
                table: "KHACHHANG",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Zalo",
                table: "KHACHHANG",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GiaoDichGold",
                schema: "gold",
                columns: table => new
                {
                    MaGiaoDich = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NgayGiaoDich = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TenTaiKhoan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsChuaThanhToan = table.Column<bool>(type: "bit", nullable: false),
                    IsThanhToanNo = table.Column<bool>(type: "bit", nullable: false),
                    MaKhachHang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoGold = table.Column<int>(type: "int", nullable: true),
                    SoTienThanhToan = table.Column<int>(type: "int", nullable: false),
                    SoTienNo = table.Column<int>(type: "int", nullable: true),
                    TTCG = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiaoDichGold", x => x.MaGiaoDich);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GiaoDichGold",
                schema: "gold");

            migrationBuilder.DropColumn(
                name: "Facebook",
                table: "KHACHHANG");

            migrationBuilder.DropColumn(
                name: "SoTienConNo",
                table: "KHACHHANG");

            migrationBuilder.DropColumn(
                name: "SoTienConThua",
                table: "KHACHHANG");

            migrationBuilder.DropColumn(
                name: "Zalo",
                table: "KHACHHANG");

            migrationBuilder.CreateTable(
                name: "GiaoDich",
                schema: "gold",
                columns: table => new
                {
                    MaGiaoDich = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsChuaThanhToan = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsThanhToanNo = table.Column<bool>(type: "bit", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    MaKhachHang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayGiaoDich = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SoGold = table.Column<int>(type: "int", nullable: true),
                    SoTienNo = table.Column<int>(type: "int", nullable: true),
                    SoTienThanhToan = table.Column<int>(type: "int", nullable: false),
                    TTCG = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenTaiKhoan = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiaoDich", x => x.MaGiaoDich);
                });
        }
    }
}
