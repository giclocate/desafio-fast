using Microsoft.EntityFrameworkCore;
using WorkshopApi.Models;

namespace WorkshopApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Workshop> Workshops { get; set; }
        public DbSet<Colaborador> Colaboradores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Workshop>()
                .HasMany(w => w.Colaboradores)
                .WithMany(c => c.Workshops)
                .UsingEntity(j => j.ToTable("WorkshopColaboradores"));

            modelBuilder.Entity<Workshop>()
                .Property(w => w.Nome)
                .HasMaxLength(200);

            modelBuilder.Entity<Colaborador>()
                .Property(c => c.Nome)
                .HasMaxLength(200);
        }
    }
}