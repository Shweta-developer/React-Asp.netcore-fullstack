using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebApplication9.Entities;
using WebApplication9.Models;

namespace WebApplication9.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TeacherClass>().HasKey(sc => new { sc.TId, sc.CId });

            modelBuilder.Entity<TeacherClass>()
                .HasOne<Teacher>(sc => sc.Teacher)
                .WithMany(s => s.TeacherClasses)
                .HasForeignKey(sc => sc.TId);


            modelBuilder.Entity<TeacherClass>()
                .HasOne<Class>(sc => sc.ClassInfo)
                .WithMany(s => s.TeacherClasses)
                .HasForeignKey(sc => sc.CId);
            
            modelBuilder.Entity<User>()
            .HasOne<Teacher>(s => s.Teacher)
            .WithOne(ad => ad.User)
            .HasForeignKey<Teacher>(ad => ad.TeacherUserRef).OnDelete(DeleteBehavior.Cascade); 
            
            modelBuilder.Entity<Teacher>()
    .HasOne<User>(ad => ad.User)
    .WithOne(s => s.Teacher)
    .HasForeignKey<Teacher>(ad => ad.TeacherUserRef).OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<User>()
           .HasOne<Admin>(s => s.Admin)
           .WithOne(ad => ad.User)
           .HasForeignKey<Admin>(ad => ad.AdminUserRef).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Admin>()
    .HasOne<User>(ad => ad.User)
    .WithOne(s => s.Admin)
    .HasForeignKey<Admin>(ad => ad.AdminUserRef).OnDelete(DeleteBehavior.Cascade);
        }


        public DbSet<User> Users { get; set; }
        public DbSet<Teacher> Teacher { get; set; }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<Class> ClassInfo { get; set; }
        public DbSet<TeacherClass> TeacherClasses { get; set; }
    }
}

