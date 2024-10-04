//using System;
//using System.Collections.Generic;
//using Microsoft.EntityFrameworkCore;

//namespace Placements.DataAccess.PaatashalaCompany.Models;

//public partial class PaatashalacompanydbContext : DbContext
//{
//    public PaatashalacompanydbContext()
//    {
//    }

//    public PaatashalacompanydbContext(DbContextOptions<PaatashalacompanydbContext> options)
//        : base(options)
//    {
//    }

//    public virtual DbSet<Companydatum> Companydata { get; set; }

//    public virtual DbSet<Companyindustry> Companyindustries { get; set; }

//    public virtual DbSet<Companyregistration> Companyregistrations { get; set; }

//    public virtual DbSet<Companytechonology> Companytechonologies { get; set; }

//    public virtual DbSet<Industry> Industries { get; set; }

//    public virtual DbSet<Login> Logins { get; set; }

//    public virtual DbSet<Paatashalaregistration> Paatashalaregistrations { get; set; }

//    public virtual DbSet<Role> Roles { get; set; }

//    public virtual DbSet<Technology> Technologies { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=root;database=paatashalacompanydb");

//    protected override void OnModelCreating(ModelBuilder modelBuilder)
//    {
//        modelBuilder.Entity<Companydatum>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("PRIMARY");

//            entity.ToTable("companydata");

//            entity.Property(e => e.Address).HasMaxLength(150);
//            entity.Property(e => e.AddressLine1).HasMaxLength(50);
//            entity.Property(e => e.City).HasMaxLength(50);
//            entity.Property(e => e.ContactPerson).HasMaxLength(50);
//            entity.Property(e => e.Country).HasMaxLength(50);
//            entity.Property(e => e.Gstnumber)
//                .HasMaxLength(50)
//                .HasColumnName("GSTNumber");
//            entity.Property(e => e.Isdeleted).HasColumnName("isdeleted");
//            entity.Property(e => e.Name).HasMaxLength(50);
//            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
//            entity.Property(e => e.State).HasMaxLength(50);
//            entity.Property(e => e.Url).HasMaxLength(250);
//            entity.Property(e => e.ZipCode).HasMaxLength(50);
//        });

//        modelBuilder.Entity<Companyindustry>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("PRIMARY");

//            entity.ToTable("companyindustries");

//            entity.HasIndex(e => e.CompanyId, "FK_CompanyIndustries_CompanyData");

//            entity.HasIndex(e => e.IndustryId, "FK_CompanyIndustries_Industries");

//            entity.HasOne(d => d.Company).WithMany(p => p.Companyindustries)
//                .HasForeignKey(d => d.CompanyId)
//                .HasConstraintName("FK_CompanyIndustries_CompanyData");

//            entity.HasOne(d => d.Industry).WithMany(p => p.Companyindustries)
//                .HasForeignKey(d => d.IndustryId)
//                .HasConstraintName("FK_CompanyIndustries_Industries");
//        });

//        modelBuilder.Entity<Companyregistration>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("PRIMARY");

//            entity.ToTable("companyregistration");

//            entity.Property(e => e.CompanyName).HasMaxLength(50);
//            entity.Property(e => e.ContactPerson).HasMaxLength(50);
//            entity.Property(e => e.DateOfRegistration).HasColumnType("datetime");
//            entity.Property(e => e.Email).HasMaxLength(50);
//            entity.Property(e => e.Location).HasMaxLength(50);
//            entity.Property(e => e.Password).HasMaxLength(50);
//            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
//        });

//        modelBuilder.Entity<Companytechonology>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("PRIMARY");

//            entity.ToTable("companytechonologies");

//            entity.HasIndex(e => e.CompanyId, "FK_CompanyTechonologies_CompanyData");

//            entity.HasIndex(e => e.TechnologyId, "FK_CompanyTechonologies_Technologies");

//            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

//            entity.HasOne(d => d.Company).WithMany(p => p.Companytechonologies)
//                .HasForeignKey(d => d.CompanyId)
//                .HasConstraintName("FK_CompanyTechonologies_CompanyData");

//            entity.HasOne(d => d.Technology).WithMany(p => p.Companytechonologies)
//                .HasForeignKey(d => d.TechnologyId)
//                .HasConstraintName("FK_CompanyTechonologies_Technologies");
//        });

//        modelBuilder.Entity<Industry>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("PRIMARY");

//            entity.ToTable("industries");

//            entity.Property(e => e.Description).HasMaxLength(50);
//            entity.Property(e => e.Type).HasMaxLength(50);
//        });

//        modelBuilder.Entity<Login>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("PRIMARY");

//            entity.ToTable("login");

//            entity.HasIndex(e => e.CompanyId, "FK_Login_CompanyData");

//            entity.HasIndex(e => e.RoleId, "FK_Login_Role");

//            entity.Property(e => e.DateOfRegistration).HasColumnType("datetime");
//            entity.Property(e => e.EmployeeId).HasMaxLength(50);
//            entity.Property(e => e.Isdeleted).HasColumnName("isdeleted");
//            entity.Property(e => e.Password).HasMaxLength(50);
//            entity.Property(e => e.UserName).HasMaxLength(50);

//            entity.HasOne(d => d.Company).WithMany(p => p.Logins)
//                .HasForeignKey(d => d.CompanyId)
//                .HasConstraintName("FK_Login_CompanyData");

//            entity.HasOne(d => d.Role).WithMany(p => p.Logins)
//                .HasForeignKey(d => d.RoleId)
//                .HasConstraintName("FK_Login_Role");
//        });

//        modelBuilder.Entity<Paatashalaregistration>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("PRIMARY");

//            entity.ToTable("paatashalaregistrations");

//            entity.HasIndex(e => e.CompanyId, "FK_PaatashalaRegistrations_CompanyData");

//            entity.HasOne(d => d.Company).WithMany(p => p.Paatashalaregistrations)
//                .HasForeignKey(d => d.CompanyId)
//                .HasConstraintName("FK_PaatashalaRegistrations_CompanyData");
//        });

//        modelBuilder.Entity<Role>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("PRIMARY");

//            entity.ToTable("role");

//            entity.Property(e => e.Description).HasMaxLength(50);
//            entity.Property(e => e.Isdeleted).HasColumnName("isdeleted");
//            entity.Property(e => e.RoleName).HasMaxLength(50);
//        });

//        modelBuilder.Entity<Technology>(entity =>
//        {
//            entity.HasKey(e => e.Id).HasName("PRIMARY");

//            entity.ToTable("technologies");

//            entity.Property(e => e.Description).HasMaxLength(50);
//            entity.Property(e => e.Isdeleted).HasColumnName("isdeleted");
//            entity.Property(e => e.Name).HasMaxLength(50);
//        });

//        OnModelCreatingPartial(modelBuilder);
//    }

//    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
//}
