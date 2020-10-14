using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication9.Migrations
{
    public partial class adminchanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    AId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<int>(nullable: false),
                    SchoolName = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Postcode = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    AdminUserRef = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.AId);
                    table.ForeignKey(
                        name: "FK_Admin_Users_AdminUserRef",
                        column: x => x.AdminUserRef,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Admin_AdminUserRef",
                table: "Admin",
                column: "AdminUserRef",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admin");
        }
    }
}
