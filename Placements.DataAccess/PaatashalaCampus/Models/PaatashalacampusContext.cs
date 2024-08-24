using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Placements.DataAccess.PaatashalaCampus.Models;

public partial class PaatashalacampusContext : DbContext
{
    public PaatashalacampusContext()
    {
    }

    public PaatashalacampusContext(DbContextOptions<PaatashalacampusContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Calendarevent> Calendarevents { get; set; }

    public virtual DbSet<Invitation> Invitations { get; set; }

    public virtual DbSet<Jobposting> Jobpostings { get; set; }

    public virtual DbSet<Jobpostingdetail> Jobpostingdetails { get; set; }

    public virtual DbSet<Studentplaced> Studentplaceds { get; set; }

    public virtual DbSet<Tblstudent> Tblstudents { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=akram@123;database=paatashalacampus");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Calendarevent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("calendarevents");

            entity.Property(e => e.EventDescription).HasMaxLength(150);
            entity.Property(e => e.EventEndDateTime).HasColumnType("datetime");
            entity.Property(e => e.EventStartDateTime).HasColumnType("datetime");
            entity.Property(e => e.EventType).HasMaxLength(50);
        });

        modelBuilder.Entity<Invitation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("invitations");

            entity.Property(e => e.Bcc).HasMaxLength(50);
            entity.Property(e => e.Cc).HasMaxLength(50);
            entity.Property(e => e.From).HasMaxLength(50);
            entity.Property(e => e.IsAccepted).HasColumnType("bit(1)");
            entity.Property(e => e.Recipients).HasMaxLength(50);
        });

        modelBuilder.Entity<Jobposting>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobposting");

            entity.Property(e => e.IsClosed).HasColumnType("bit(1)");
            entity.Property(e => e.JobDescription).HasMaxLength(50);
            entity.Property(e => e.JobRole).HasMaxLength(50);
            entity.Property(e => e.ValidFrom).HasColumnType("datetime");
            entity.Property(e => e.ValidTill).HasColumnType("datetime");
        });

        modelBuilder.Entity<Jobpostingdetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobpostingdetails");

            entity.Property(e => e.Streams).HasMaxLength(50);
        });

        modelBuilder.Entity<Studentplaced>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("studentplaced");
        });

        modelBuilder.Entity<Tblstudent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tblstudent");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
