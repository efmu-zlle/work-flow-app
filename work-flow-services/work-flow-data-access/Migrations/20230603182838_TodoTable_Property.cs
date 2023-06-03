using Microsoft.EntityFrameworkCore.Migrations;

namespace work_flow_data_access.Migrations
{
    public partial class TodoTable_Property : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Todos",
                newName: "Title");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Todos",
                newName: "Description");
        }
    }
}
