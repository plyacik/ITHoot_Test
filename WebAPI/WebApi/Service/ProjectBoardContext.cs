using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Service
{
    public class ProjectBoardContext : DbContext
    {        
        public ProjectBoardContext(DbContextOptions<ProjectBoardContext> options) : base(options)
        {
        }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Developer> Developers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProjectDeveloper>()
                .HasKey(t => new { t.ProjectId, t.DeveloperId });

            modelBuilder.Entity<ProjectDeveloper>()
                .HasOne(sc => sc.Project)
                .WithMany(s => s.ProjectDevelopers)
                .HasForeignKey(sc => sc.ProjectId);

            modelBuilder.Entity<ProjectDeveloper>()
                .HasOne(sc => sc.Developer)
                .WithMany(c => c.ProjectDevelopers)
                .HasForeignKey(sc => sc.DeveloperId);
        }
    }
}
