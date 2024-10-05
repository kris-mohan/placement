using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Placements.DataAccess.placement.Models;

public partial class PlacementContext : DbContext
{
    public PlacementContext()
    {
    }

    public PlacementContext(DbContextOptions<PlacementContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Calendarevent> Calendarevents { get; set; }

    public virtual DbSet<Campusregistration> Campusregistrations { get; set; }

    public virtual DbSet<Collegejobposting> Collegejobpostings { get; set; }

    public virtual DbSet<CollegejobpostingScheduledetail> CollegejobpostingScheduledetails { get; set; }

    public virtual DbSet<Collegejobpostingschedule> Collegejobpostingschedules { get; set; }

    public virtual DbSet<Companydatum> Companydata { get; set; }

    public virtual DbSet<Companydesignation> Companydesignations { get; set; }

    public virtual DbSet<Companyindustry> Companyindustries { get; set; }

    public virtual DbSet<Companyregistration> Companyregistrations { get; set; }

    public virtual DbSet<Companytechonology> Companytechonologies { get; set; }

    public virtual DbSet<Industry> Industries { get; set; }

    public virtual DbSet<Invitation> Invitations { get; set; }

    public virtual DbSet<Jobinterviewround> Jobinterviewrounds { get; set; }

    public virtual DbSet<JobpostStudentround> JobpostStudentrounds { get; set; }

    public virtual DbSet<Jobposting> Jobpostings { get; set; }

    public virtual DbSet<JobpostingSelectedstudent> JobpostingSelectedstudents { get; set; }

    public virtual DbSet<Jobpostingdetail> Jobpostingdetails { get; set; }

    public virtual DbSet<JobpostingsEligiblestudent> JobpostingsEligiblestudents { get; set; }

    public virtual DbSet<Login> Logins { get; set; }

    public virtual DbSet<Paatashalaregistration> Paatashalaregistrations { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Studentacademic> Studentacademics { get; set; }

    public virtual DbSet<Studentplaced> Studentplaceds { get; set; }

    public virtual DbSet<Studentregistartion> Studentregistartions { get; set; }

    public virtual DbSet<Tblstudent> Tblstudents { get; set; }

    public virtual DbSet<Technology> Technologies { get; set; }

    public virtual DbSet<Trainer> Trainers { get; set; }

    public virtual DbSet<Trainerschedule> Trainerschedules { get; set; }

    public virtual DbSet<Trainingcourse> Trainingcourses { get; set; }

    public virtual DbSet<Trainingmodule> Trainingmodules { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=root;database=placement");

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
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
        });

        modelBuilder.Entity<Campusregistration>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("campusregistration");

            entity.Property(e => e.Address).HasMaxLength(100);
            entity.Property(e => e.CollegeEmail).HasMaxLength(50);
            entity.Property(e => e.CollegeName).HasMaxLength(100);
            entity.Property(e => e.Country).HasMaxLength(100);
            entity.Property(e => e.DateOfRegistration).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.PlacementOfficerName).HasMaxLength(50);
            entity.Property(e => e.State).HasMaxLength(100);
            entity.Property(e => e.ZipCode).HasMaxLength(100);
        });

        modelBuilder.Entity<Collegejobposting>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("collegejobposting");

            entity.HasIndex(e => e.CollegeId, "FK_CollegePosting_College_idx");

            entity.HasIndex(e => e.JobPostingId, "FK_CollegePosting_JobPosting_idx");

            entity.HasOne(d => d.College).WithMany(p => p.Collegejobpostings)
                .HasForeignKey(d => d.CollegeId)
                .HasConstraintName("FK_CollegePosting_College");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.Collegejobpostings)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_CollegePosting_JobPosting");
        });

        modelBuilder.Entity<CollegejobpostingScheduledetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("collegejobposting_scheduledetails");

            entity.Property(e => e.Category).HasMaxLength(45);
            entity.Property(e => e.Key).HasMaxLength(45);
            entity.Property(e => e.Value).HasMaxLength(500);
        });

        modelBuilder.Entity<Collegejobpostingschedule>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("collegejobpostingschedule");

            entity.HasIndex(e => e.CollegeId, "FK_CollegeSchedule_College_idx");

            entity.HasIndex(e => e.JobPostingId, "FK_CollegeSchedule_JobPosting_idx");

            entity.Property(e => e.ScheduledDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.Collegejobpostingschedules)
                .HasForeignKey(d => d.CollegeId)
                .HasConstraintName("FK_CollegeSchedule_College");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.Collegejobpostingschedules)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_CollegeSchedule_JobPosting");
        });

        modelBuilder.Entity<Companydatum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("companydata");

            entity.Property(e => e.Address).HasMaxLength(150);
            entity.Property(e => e.AddressLine1).HasMaxLength(50);
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.ContactPerson).HasMaxLength(50);
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.Gstnumber)
                .HasMaxLength(50)
                .HasColumnName("GSTNumber");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.State).HasMaxLength(50);
            entity.Property(e => e.Url).HasMaxLength(250);
            entity.Property(e => e.ZipCode).HasMaxLength(50);
        });

        modelBuilder.Entity<Companydesignation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("companydesignation");

            entity.HasIndex(e => e.CompanyId, "FK_Company_Designation_idx");

            entity.Property(e => e.Name).HasMaxLength(45);

            entity.HasOne(d => d.Company).WithMany(p => p.Companydesignations)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_Company_Designation");
        });

        modelBuilder.Entity<Companyindustry>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("companyindustries");

            entity.HasIndex(e => e.CompanyId, "FK_CompanyIndustries_CompanyData");

            entity.HasIndex(e => e.IndustryId, "FK_CompanyIndustries_Industries");

            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");

            entity.HasOne(d => d.Company).WithMany(p => p.Companyindustries)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_CompanyIndustries_CompanyData");

            entity.HasOne(d => d.Industry).WithMany(p => p.Companyindustries)
                .HasForeignKey(d => d.IndustryId)
                .HasConstraintName("FK_CompanyIndustries_Industries");
        });

        modelBuilder.Entity<Companyregistration>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("companyregistration");

            entity.Property(e => e.CompanyName).HasMaxLength(50);
            entity.Property(e => e.ContactPerson).HasMaxLength(50);
            entity.Property(e => e.DateOfRegistration).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Location).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
        });

        modelBuilder.Entity<Companytechonology>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("companytechonologies");

            entity.HasIndex(e => e.CompanyId, "FK_CompanyTechonologies_CompanyData");

            entity.HasIndex(e => e.TechnologyId, "FK_CompanyTechonologies_Technologies");

            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");

            entity.HasOne(d => d.Company).WithMany(p => p.Companytechonologies)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_CompanyTechonologies_CompanyData");

            entity.HasOne(d => d.Technology).WithMany(p => p.Companytechonologies)
                .HasForeignKey(d => d.TechnologyId)
                .HasConstraintName("FK_CompanyTechonologies_Technologies");
        });

        modelBuilder.Entity<Industry>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("industries");

            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Type).HasMaxLength(50);
        });

        modelBuilder.Entity<Invitation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("invitations");

            entity.Property(e => e.Bcc).HasMaxLength(50);
            entity.Property(e => e.Cc).HasMaxLength(50);
            entity.Property(e => e.From).HasMaxLength(50);
            entity.Property(e => e.IsAccepted).HasColumnType("bit(1)");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Recipients).HasMaxLength(50);
        });

        modelBuilder.Entity<Jobinterviewround>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobinterviewrounds");

            entity.HasIndex(e => e.JobPostingId, "FK_Round_JobPosting_idx");

            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(45);

            entity.HasOne(d => d.JobPosting).WithMany(p => p.Jobinterviewrounds)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_Round_JobPosting");
        });

        modelBuilder.Entity<JobpostStudentround>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobpost_studentround");

            entity.HasIndex(e => e.JobPostingRoundId, "FK_JobPostStudentRound_JobPostRound_idx");

            entity.HasIndex(e => e.StudentId, "FK_JobPost_Student_idx");

            entity.Property(e => e.Col)
                .HasMaxLength(45)
                .HasColumnName("col");
            entity.Property(e => e.Feedback).HasMaxLength(45);
            entity.Property(e => e.HasPassed).HasColumnType("bit(1)");
            entity.Property(e => e.RoundDate).HasColumnType("datetime");

            entity.HasOne(d => d.JobPostingRound).WithMany(p => p.JobpostStudentrounds)
                .HasForeignKey(d => d.JobPostingRoundId)
                .HasConstraintName("FK_JobPostStudentRound_JobPostRound");

            entity.HasOne(d => d.Student).WithMany(p => p.JobpostStudentrounds)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_JobPost_Student");
        });

        modelBuilder.Entity<Jobposting>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobposting");

            entity.HasIndex(e => e.CompanyId, "FK_JobPosting_Company_idx");

            entity.HasIndex(e => e.TechnologyId, "FK_JobPosting_Technology_idx");

            entity.Property(e => e.IsClosed).HasColumnType("bit(1)");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.JobDescription).HasMaxLength(50);
            entity.Property(e => e.JobRole).HasMaxLength(50);
            entity.Property(e => e.Location).HasMaxLength(255);
            entity.Property(e => e.Salary).HasPrecision(10);
            entity.Property(e => e.ValidFrom).HasColumnType("datetime");
            entity.Property(e => e.ValidTill).HasColumnType("datetime");

            entity.HasOne(d => d.Company).WithMany(p => p.Jobpostings)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_JobPosting_Company");

            entity.HasOne(d => d.Technology).WithMany(p => p.Jobpostings)
                .HasForeignKey(d => d.TechnologyId)
                .HasConstraintName("FK_JobPosting_Technology");
        });

        modelBuilder.Entity<JobpostingSelectedstudent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobposting_selectedstudents");

            entity.HasIndex(e => e.JobPostingId, "FK_jobposting_selectedstudents_JobPosting_idx");

            entity.HasIndex(e => e.StudentId, "FK_jobposting_selectedstudents_Student_idx");

            entity.Property(e => e.HasAcceptedOffer).HasColumnType("bit(1)");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.JobpostingSelectedstudents)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_jobposting_selectedstudents_JobPosting");

            entity.HasOne(d => d.Student).WithMany(p => p.JobpostingSelectedstudents)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_jobposting_selectedstudents_Student");
        });

        modelBuilder.Entity<Jobpostingdetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobpostingdetails");

            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Streams).HasMaxLength(50);
        });

        modelBuilder.Entity<JobpostingsEligiblestudent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobpostings_eligiblestudents");

            entity.HasIndex(e => e.JobPostingId, "FK_jobpostings_eligiblestudents_JobPosting_idx");

            entity.HasIndex(e => e.StudentId, "FK_jobpostings_eligiblestudents_Student_idx");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.JobpostingsEligiblestudents)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_jobpostings_eligiblestudents_JobPosting");

            entity.HasOne(d => d.Student).WithMany(p => p.JobpostingsEligiblestudents)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_jobpostings_eligiblestudents_Student");
        });

        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("login");

            entity.HasIndex(e => e.CompanyId, "FK_Login_CompanyData");

            entity.HasIndex(e => e.RoleId, "FK_Login_Role");

            entity.Property(e => e.DateOfRegistration).HasColumnType("datetime");
            entity.Property(e => e.EmployeeId).HasMaxLength(50);
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.UserName).HasMaxLength(50);

            entity.HasOne(d => d.Company).WithMany(p => p.Logins)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_Login_CompanyData");

            entity.HasOne(d => d.Role).WithMany(p => p.Logins)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_Login_Role");
        });

        modelBuilder.Entity<Paatashalaregistration>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("paatashalaregistrations");

            entity.HasIndex(e => e.CompanyId, "FK_PaatashalaRegistrations_CompanyData");

            entity.HasOne(d => d.Company).WithMany(p => p.Paatashalaregistrations)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_PaatashalaRegistrations_CompanyData");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        modelBuilder.Entity<Studentacademic>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("studentacademics");

            entity.HasIndex(e => e.StudentId, "FK_StudentAcademy_Student_idx");

            entity.Property(e => e.Cgpa)
                .HasPrecision(10)
                .HasColumnName("CGPA");

            entity.HasOne(d => d.Student).WithMany(p => p.Studentacademics)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_StudentAcademy_Student");
        });

        modelBuilder.Entity<Studentplaced>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("studentplaced");
        });

        modelBuilder.Entity<Studentregistartion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("studentregistartion");

            entity.Property(e => e.Batch).HasMaxLength(50);
            entity.Property(e => e.Branch).HasMaxLength(50);
            entity.Property(e => e.DateOfRegistration).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.RollNumber).HasMaxLength(50);
        });

        modelBuilder.Entity<Tblstudent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tblstudent");

            entity.Property(e => e.AadharCardNumber).HasMaxLength(45);
            entity.Property(e => e.CurrentAddress).HasMaxLength(500);
            entity.Property(e => e.DateOfBirth).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(45);
            entity.Property(e => e.LastName).HasMaxLength(45);
            entity.Property(e => e.ParentName).HasMaxLength(45);
            entity.Property(e => e.ParentPhoneNumber).HasMaxLength(45);
            entity.Property(e => e.PermanentAddress).HasMaxLength(500);
            entity.Property(e => e.PhoneNumber).HasMaxLength(45);
            entity.Property(e => e.RollNo).HasMaxLength(45);
        });

        modelBuilder.Entity<Technology>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("technologies");

            entity.Property(e => e.Description).HasMaxLength(50);
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Trainer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("trainers");

            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
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
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
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
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.ValidFrom).HasColumnType("datetime");
            entity.Property(e => e.ValidTill).HasColumnType("datetime");
        });

        modelBuilder.Entity<Trainingmodule>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("trainingmodule");

            entity.HasIndex(e => e.TrainingCourseId, "FK_TrainingModule_TrainingCourse");

            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
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
