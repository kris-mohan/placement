using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Placements.DataAccess.PaatashalaTraining.Models;

public partial class PaatashalatrainingContext : DbContext
{
    public PaatashalatrainingContext()
    {
    }

    public PaatashalatrainingContext(DbContextOptions<PaatashalatrainingContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Trainer> Trainers { get; set; }

    public virtual DbSet<Trainerschedule> Trainerschedules { get; set; }

    public virtual DbSet<Trainingcourse> Trainingcourses { get; set; }

    public virtual DbSet<Trainingmodule> Trainingmodules { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=root;database=paatashalatraining");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Trainer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("trainers");

            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
        });

        modelBuilder.Entity<Trainerschedule>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("trainerschedule");

            entity.HasIndex(e => e.TrainerId, "FK_TrainerSchedule_Trainers");

            entity.HasIndex(e => e.CourseId, "FK_TrainerSchedule_TrainingCourse");

            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");
            entity.Property(e => e.ScheduleType).HasMaxLength(50);
            entity.Property(e => e.StartDate).HasColumnType("datetime");

            entity.HasOne(d => d.Course).WithMany(p => p.Trainerschedules)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_TrainerSchedule_TrainingCourse");

            entity.HasOne(d => d.Trainer).WithMany(p => p.Trainerschedules)
                .HasForeignKey(d => d.TrainerId)
                .HasConstraintName("FK_TrainerSchedule_Trainers");
        });

        modelBuilder.Entity<Trainingcourse>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("trainingcourse");

            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.ValidFrom).HasColumnType("datetime");
            entity.Property(e => e.ValidTill).HasColumnType("datetime");
        });

        modelBuilder.Entity<Trainingmodule>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("trainingmodule");

            entity.HasIndex(e => e.TrainingCourseId, "FK_TrainingModule_TrainingCourse");

            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.TrainingAssetFolder).HasMaxLength(50);
            entity.Property(e => e.TrainingMode).HasMaxLength(50);

            entity.HasOne(d => d.TrainingCourse).WithMany(p => p.Trainingmodules)
                .HasForeignKey(d => d.TrainingCourseId)
                .HasConstraintName("FK_TrainingModule_TrainingCourse");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
