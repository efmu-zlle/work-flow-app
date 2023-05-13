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

        public DbSet<Teams> Teams { get; set; }

        public DbSet<Users> Users { get; set; }

        public DbSet<Todos> Todos { get; set; }
    }
}
