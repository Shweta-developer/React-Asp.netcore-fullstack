using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication9.Migrations
{
    public partial class @try : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClassInfo",
                columns: table => new
                {
                    CId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClassName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassInfo", x => x.CId);
                });

            migrationBuilder.CreateTable(
                name: "Teacher",
                columns: table => new
                {
                    TId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: true),
                    TeacherUserRef = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teacher", x => x.TId);
                    table.ForeignKey(
                        name: "FK_Teacher_Users_TeacherUserRef",
                        column: x => x.TeacherUserRef,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TeacherClasses",
                columns: table => new
                {
                    TId = table.Column<int>(nullable: false),
                    CId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeacherClasses", x => new { x.TId, x.CId });
                    table.ForeignKey(
                        name: "FK_TeacherClasses_ClassInfo_CId",
                        column: x => x.CId,
                        principalTable: "ClassInfo",
                        principalColumn: "CId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeacherClasses_Teacher_TId",
                        column: x => x.TId,
                        principalTable: "Teacher",
                        principalColumn: "TId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Teacher_TeacherUserRef",
                table: "Teacher",
                column: "TeacherUserRef",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TeacherClasses_CId",
                table: "TeacherClasses",
                column: "CId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeacherClasses");

            migrationBuilder.DropTable(
                name: "ClassInfo");

            migrationBuilder.DropTable(
                name: "Teacher");
        }
    }
}
