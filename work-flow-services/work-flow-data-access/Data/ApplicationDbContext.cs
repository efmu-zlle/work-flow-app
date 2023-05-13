using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using work_flow_models;

namespace work_flow_data_access.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Team> Teams { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Todo> Todos { get; set; }
    }
}
