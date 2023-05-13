using Microsoft.EntityFrameworkCore.Migrations;

namespace work_flow_data_access.Migrations
{
    public partial class NewPropertyToTodos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Todos",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Todos");
        }
    }
}
