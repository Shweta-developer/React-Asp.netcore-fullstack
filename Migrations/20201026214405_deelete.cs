using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication9.Migrations
{
    public partial class deelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "YearId",
                table: "ClassInfo",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "SchoolYears",
                columns: table => new
                {
                    YearId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    year = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolYears", x => x.YearId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassInfo_YearId",
                table: "ClassInfo",
                column: "YearId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClassInfo_SchoolYears_YearId",
                table: "ClassInfo",
                column: "YearId",
                principalTable: "SchoolYears",
                principalColumn: "YearId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassInfo_SchoolYears_YearId",
                table: "ClassInfo");

            migrationBuilder.DropTable(
                name: "SchoolYears");

            migrationBuilder.DropIndex(
                name: "IX_ClassInfo_YearId",
                table: "ClassInfo");

            migrationBuilder.DropColumn(
                name: "YearId",
                table: "ClassInfo");
        }
    }
}
