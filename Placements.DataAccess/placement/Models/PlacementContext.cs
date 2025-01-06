using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Placements.DataAccess.Placement.Models;

public partial class PlacementContext : DbContext
{
    public PlacementContext()
    {
    }

    public PlacementContext(DbContextOptions<PlacementContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Batch> Batches { get; set; }

    public virtual DbSet<Calendarevent> Calendarevents { get; set; }

    public virtual DbSet<CampusCompany> CampusCompanies { get; set; }

    public virtual DbSet<Campusregistration> Campusregistrations { get; set; }

    public virtual DbSet<Chat> Chats { get; set; }

    public virtual DbSet<Collegejobposting> Collegejobpostings { get; set; }

    public virtual DbSet<CollegejobpostingScheduledetail> CollegejobpostingScheduledetails { get; set; }

    public virtual DbSet<Collegejobpostingschedule> Collegejobpostingschedules { get; set; }

    public virtual DbSet<CompanyJobBatch> CompanyJobBatches { get; set; }

    public virtual DbSet<CompanyJobCourse> CompanyJobCourses { get; set; }

    public virtual DbSet<CompanyJobStream> CompanyJobStreams { get; set; }

    public virtual DbSet<Companydatum> Companydata { get; set; }

    public virtual DbSet<Companydesignation> Companydesignations { get; set; }

    public virtual DbSet<Companyindustry> Companyindustries { get; set; }

    public virtual DbSet<Companyregistration> Companyregistrations { get; set; }

    public virtual DbSet<Companytechnology> Companytechnologies { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Document> Documents { get; set; }

    public virtual DbSet<Email> Emails { get; set; }

    public virtual DbSet<Group> Groups { get; set; }

    public virtual DbSet<Groupmember> Groupmembers { get; set; }

    public virtual DbSet<IndentForm> IndentForms { get; set; }

    public virtual DbSet<IndentFormDynamicField> IndentFormDynamicFields { get; set; }

    public virtual DbSet<Industry> Industries { get; set; }

    public virtual DbSet<Invitation> Invitations { get; set; }

    public virtual DbSet<Jobinterviewpanel> Jobinterviewpanels { get; set; }

    public virtual DbSet<Jobinterviewround> Jobinterviewrounds { get; set; }

    public virtual DbSet<JobpostStudentround> JobpostStudentrounds { get; set; }

    public virtual DbSet<Jobposting> Jobpostings { get; set; }

    public virtual DbSet<JobpostingSelectedstudent> JobpostingSelectedstudents { get; set; }

    public virtual DbSet<JobpostingSkill> JobpostingSkills { get; set; }

    public virtual DbSet<Jobpostingdetail> Jobpostingdetails { get; set; }

    public virtual DbSet<JobpostingsEligiblestudent> JobpostingsEligiblestudents { get; set; }

    public virtual DbSet<Jobstudentstatus> Jobstudentstatuses { get; set; }

    public virtual DbSet<Login> Logins { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Messagestatus> Messagestatuses { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Paatashalaregistration> Paatashalaregistrations { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Skill> Skills { get; set; }

    public virtual DbSet<SkillType> SkillTypes { get; set; }

    public virtual DbSet<Stream> Streams { get; set; }

    public virtual DbSet<StudentSemesterMark> StudentSemesterMarks { get; set; }

    public virtual DbSet<StudentSkill> StudentSkills { get; set; }

    public virtual DbSet<Studentacademic> Studentacademics { get; set; }

    public virtual DbSet<Studentplaced> Studentplaceds { get; set; }

    public virtual DbSet<Studentregistartion> Studentregistartions { get; set; }

    public virtual DbSet<Tblstudent> Tblstudents { get; set; }

    public virtual DbSet<Technology> Technologies { get; set; }

    public virtual DbSet<Template> Templates { get; set; }

    public virtual DbSet<TemplateCategory> TemplateCategories { get; set; }

    public virtual DbSet<TemplatePlaceholder> TemplatePlaceholders { get; set; }

    public virtual DbSet<Trainer> Trainers { get; set; }

    public virtual DbSet<Trainerschedule> Trainerschedules { get; set; }

    public virtual DbSet<Trainingcourse> Trainingcourses { get; set; }

    public virtual DbSet<Trainingmodule> Trainingmodules { get; set; }

    public virtual DbSet<University> Universities { get; set; }

    public virtual DbSet<Userrole> Userroles { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=root;database=placement");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Batch>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("batch");

            entity.Property(e => e.Name).HasMaxLength(45);
        });

        modelBuilder.Entity<Calendarevent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("calendarevents");

            entity.HasIndex(e => e.OrgId, "FK_Event_Campus_idx");

            entity.HasIndex(e => e.CompanyId, "FK_Event_Company_idx");

            entity.HasIndex(e => e.JobInterviewRoundId, "FK_Event_JobInterviewRound_idx");

            entity.Property(e => e.EventDescription).HasMaxLength(150);
            entity.Property(e => e.EventEndDateTime).HasColumnType("datetime");
            entity.Property(e => e.EventStartDateTime).HasColumnType("datetime");
            entity.Property(e => e.EventType).HasMaxLength(50);
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");

            entity.HasOne(d => d.Company).WithMany(p => p.Calendarevents)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_Event_Company");

            entity.HasOne(d => d.JobInterviewRound).WithMany(p => p.Calendarevents)
                .HasForeignKey(d => d.JobInterviewRoundId)
                .HasConstraintName("FK_Event_JobInterviewRound");

            entity.HasOne(d => d.Org).WithMany(p => p.Calendarevents)
                .HasForeignKey(d => d.OrgId)
                .HasConstraintName("FK_Event_Campus");
        });

        modelBuilder.Entity<CampusCompany>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("campus_company");

            entity.HasIndex(e => e.CampusId, "FK_Campus_CampusRegistartion_idx");

            entity.HasIndex(e => e.CompanyId, "FK_Company_Companydatum_idx");

            entity.HasOne(d => d.Campus).WithMany(p => p.CampusCompanies)
                .HasForeignKey(d => d.CampusId)
                .HasConstraintName("FK_Campus_CampusRegistartion");

            entity.HasOne(d => d.Company).WithMany(p => p.CampusCompanies)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_Company_Companydatum");
        });

        modelBuilder.Entity<Campusregistration>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("campusregistration");

            entity.HasIndex(e => e.ParentCampusId, "FK_Campus_Campus_idx");

            entity.HasIndex(e => e.UniversityId, "FK_Campus_University_idx");

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

            entity.HasOne(d => d.ParentCampus).WithMany(p => p.InverseParentCampus)
                .HasForeignKey(d => d.ParentCampusId)
                .HasConstraintName("FK_Campus_Campus");

            entity.HasOne(d => d.University).WithMany(p => p.Campusregistrations)
                .HasForeignKey(d => d.UniversityId)
                .HasConstraintName("FK_Campus_University");
        });

        modelBuilder.Entity<Chat>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("chat");

            entity.HasIndex(e => e.ReceiverId, "FK_Receiver_Login_idx");

            entity.HasIndex(e => e.SenderId, "FK_Sender_Login_idx");

            entity.Property(e => e.IsDeleted).HasMaxLength(45);

            entity.HasOne(d => d.Receiver).WithMany(p => p.ChatReceivers)
                .HasForeignKey(d => d.ReceiverId)
                .HasConstraintName("FK_Receiver_Login");

            entity.HasOne(d => d.Sender).WithMany(p => p.ChatSenders)
                .HasForeignKey(d => d.SenderId)
                .HasConstraintName("FK_Sender_Login");
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

        modelBuilder.Entity<CompanyJobBatch>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("company_job_batch");

            entity.HasIndex(e => e.BatchId, "FK_CompanyJobBatch_Batch_idx");

            entity.HasIndex(e => e.JobPostingId, "FK_CompanyJobBatch_JobPosting_idx");

            entity.HasOne(d => d.Batch).WithMany(p => p.CompanyJobBatches)
                .HasForeignKey(d => d.BatchId)
                .HasConstraintName("FK_CompanyJobBatch_Batch");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.CompanyJobBatches)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_CompanyJobBatch_JobPosting");
        });

        modelBuilder.Entity<CompanyJobCourse>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("company_job_course");

            entity.HasIndex(e => e.CourseId, "FK_CompanyJobCourse_Course");

            entity.HasIndex(e => e.JobPostingId, "FK_CompanyJobCourse_JobPost_idx");

            entity.HasOne(d => d.Course).WithMany(p => p.CompanyJobCourses)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_CompanyJobCourse_Course");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.CompanyJobCourses)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_CompanyJobCourse_JobPost");
        });

        modelBuilder.Entity<CompanyJobStream>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("company_job_stream");

            entity.HasIndex(e => e.JobPostingId, "FK_CompanyJobStream_JobPosting_idx");

            entity.HasIndex(e => e.StreamId, "FK_CompanyJobStream_Stream_idx");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.CompanyJobStreams)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_CompanyJobStream_JobPosting");

            entity.HasOne(d => d.Stream).WithMany(p => p.CompanyJobStreams)
                .HasForeignKey(d => d.StreamId)
                .HasConstraintName("FK_CompanyJobStream_Stream");
        });

        modelBuilder.Entity<Companydatum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("companydata");

            entity.Property(e => e.About).HasMaxLength(10000);
            entity.Property(e => e.Address).HasMaxLength(150);
            entity.Property(e => e.AddressLine1).HasMaxLength(50);
            entity.Property(e => e.AudioPath).HasMaxLength(255);
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.CompanyType).HasMaxLength(45);
            entity.Property(e => e.ContactPerson).HasMaxLength(50);
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.DateOfRegistration).HasColumnType("datetime");
            entity.Property(e => e.DocumentPath).HasMaxLength(255);
            entity.Property(e => e.Email).HasMaxLength(45);
            entity.Property(e => e.Gstnumber)
                .HasMaxLength(50)
                .HasColumnName("GSTNumber");
            entity.Property(e => e.HeadQuarters).HasMaxLength(255);
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.LogoPath).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(45);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.PresentationPath).HasMaxLength(255);
            entity.Property(e => e.State).HasMaxLength(50);
            entity.Property(e => e.Url).HasMaxLength(250);
            entity.Property(e => e.VideoPath).HasMaxLength(255);
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

        modelBuilder.Entity<Companytechnology>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("companytechnologies");

            entity.HasIndex(e => e.CompanyId, "FK_CompanyTechnologies_CompanyData");

            entity.HasIndex(e => e.TechnologyId, "FK_CompanyTechnologies_Technologies");

            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");

            entity.HasOne(d => d.Company).WithMany(p => p.Companytechnologies)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_CompanyTechnologies_CompanyData");

            entity.HasOne(d => d.Technology).WithMany(p => p.Companytechnologies)
                .HasForeignKey(d => d.TechnologyId)
                .HasConstraintName("FK_CompanyTechnologies_Technologies");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("course");

            entity.Property(e => e.FullForm).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(45);
        });

        modelBuilder.Entity<Document>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("documents");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FileName).HasMaxLength(255);
            entity.Property(e => e.FilePath).HasMaxLength(255);
            entity.Property(e => e.FileType).HasMaxLength(45);
            entity.Property(e => e.ParentType).HasMaxLength(45);
        });

        modelBuilder.Entity<Email>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("email");

            entity.Property(e => e.Bcc)
                .HasMaxLength(245)
                .HasColumnName("BCC");
            entity.Property(e => e.Cc)
                .HasMaxLength(245)
                .HasColumnName("CC");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.IsSent).HasDefaultValueSql("'0'");
            entity.Property(e => e.SentAt).HasColumnType("datetime");
            entity.Property(e => e.Subject).HasMaxLength(245);
            entity.Property(e => e.To).HasMaxLength(245);
        });

        modelBuilder.Entity<Group>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("groups");

            entity.HasIndex(e => e.CreatedBy, "FK_User_Groups_idx");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.GroupDescription).HasMaxLength(45);
            entity.Property(e => e.GroupName).HasMaxLength(45);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Groups)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_User_Groups");
        });

        modelBuilder.Entity<Groupmember>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("groupmembers");

            entity.HasIndex(e => e.GroupId, "FK_Group_GroupMember_idx");

            entity.HasIndex(e => e.UserId, "FK_User_GroupMember_idx");

            entity.Property(e => e.JoinedDate).HasColumnType("datetime");
            entity.Property(e => e.Role).HasColumnType("enum('Admin','Member')");

            entity.HasOne(d => d.Group).WithMany(p => p.Groupmembers)
                .HasForeignKey(d => d.GroupId)
                .HasConstraintName("FK_Group_GroupMember");

            entity.HasOne(d => d.User).WithMany(p => p.Groupmembers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_User_GroupMember");
        });

        modelBuilder.Entity<IndentForm>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("indent_form");

            entity.Property(e => e.CompanyName).HasMaxLength(255);
            entity.Property(e => e.ContactPersonDesignation).HasMaxLength(255);
            entity.Property(e => e.ContactPersonName).HasMaxLength(255);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp");
            entity.Property(e => e.Email).HasMaxLength(55);
            entity.Property(e => e.PhoneNumber).HasMaxLength(45);
        });

        modelBuilder.Entity<IndentFormDynamicField>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("indent_form_dynamic_field");

            entity.HasIndex(e => e.IndentFormId, "FK_IndentField_IndentForm_idx");

            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Value).HasMaxLength(255);

            entity.HasOne(d => d.IndentForm).WithMany(p => p.IndentFormDynamicFields)
                .HasForeignKey(d => d.IndentFormId)
                .HasConstraintName("FK_IndentField_IndentForm");
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

        modelBuilder.Entity<Jobinterviewpanel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobinterviewpanels");

            entity.HasIndex(e => e.JobPostingId, "FK_JobPosting_idx");

            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Designation).HasMaxLength(100);
            entity.Property(e => e.PanelName).HasMaxLength(100);

            entity.HasOne(d => d.JobPosting).WithMany(p => p.Jobinterviewpanels)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_JobPosting");
        });

        modelBuilder.Entity<Jobinterviewround>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobinterviewrounds");

            entity.HasIndex(e => e.EventId, "FK_Round_Event_idx");

            entity.HasIndex(e => e.JobPostingId, "FK_Round_JobPosting_idx");

            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(45);

            entity.HasOne(d => d.Event).WithMany(p => p.Jobinterviewrounds)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("FK_Round_Event");

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

            entity.Property(e => e.Feedback).HasMaxLength(16000);
            entity.Property(e => e.HasPassed).HasColumnType("bit(1)");

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

            entity.HasIndex(e => e.OrgId, "FK_JobPosting_Campus_idx");

            entity.HasIndex(e => e.CompanyId, "FK_JobPosting_Company_idx");

            entity.HasIndex(e => e.TechnologyId, "FK_JobPosting_Technology_idx");

            entity.Property(e => e.DriveDate).HasColumnType("datetime");
            entity.Property(e => e.IsClosed).HasColumnType("bit(1)");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.JobDescription).HasMaxLength(15000);
            entity.Property(e => e.JobRole).HasMaxLength(50);
            entity.Property(e => e.JobType).HasMaxLength(50);
            entity.Property(e => e.Location).HasMaxLength(255);
            entity.Property(e => e.MinCgpa)
                .HasPrecision(10)
                .HasColumnName("MinCGPA");
            entity.Property(e => e.MinPucpercentage)
                .HasPrecision(10)
                .HasColumnName("MinPUCPercentage");
            entity.Property(e => e.MinSslcpercentage)
                .HasPrecision(10)
                .HasColumnName("MinSSLCPercentage");
            entity.Property(e => e.ModeOfWork).HasMaxLength(45);
            entity.Property(e => e.PostedDate).HasColumnType("datetime");
            entity.Property(e => e.Salary).HasPrecision(10);
            entity.Property(e => e.Shift).HasMaxLength(45);
            entity.Property(e => e.ValidFrom).HasColumnType("datetime");
            entity.Property(e => e.ValidTill).HasColumnType("datetime");

            entity.HasOne(d => d.Company).WithMany(p => p.Jobpostings)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_JobPosting_Company");

            entity.HasOne(d => d.Org).WithMany(p => p.Jobpostings)
                .HasForeignKey(d => d.OrgId)
                .HasConstraintName("FK_JobPosting_Campus");

            entity.HasOne(d => d.Technology).WithMany(p => p.Jobpostings)
                .HasForeignKey(d => d.TechnologyId)
                .HasConstraintName("FK_JobPosting_Technology");

            entity.HasMany(d => d.Technologies).WithMany(p => p.JobpostingsNavigation)
                .UsingEntity<Dictionary<string, object>>(
                    "Jobpostingtechnology",
                    r => r.HasOne<Technology>().WithMany()
                        .HasForeignKey("TechnologyId")
                        .HasConstraintName("jobpostingtechnology_ibfk_2"),
                    l => l.HasOne<Jobposting>().WithMany()
                        .HasForeignKey("JobpostingId")
                        .HasConstraintName("jobpostingtechnology_ibfk_1"),
                    j =>
                    {
                        j.HasKey("JobpostingId", "TechnologyId").HasName("PRIMARY");
                        j.ToTable("jobpostingtechnology");
                        j.HasIndex(new[] { "TechnologyId" }, "TechnologyId");
                    });
        });

        modelBuilder.Entity<JobpostingSelectedstudent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobposting_selectedstudents");

            entity.HasIndex(e => e.JobPostingId, "FK_jobposting_selectedstudents_JobPosting_idx");

            entity.HasIndex(e => e.StudentId, "FK_jobposting_selectedstudents_Student_idx");

            entity.Property(e => e.DateOfJoining).HasColumnType("datetime");
            entity.Property(e => e.OfferLetterExpiryDate).HasColumnType("datetime");
            entity.Property(e => e.OfferLetterSentDate).HasColumnType("datetime");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.JobpostingSelectedstudents)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_jobposting_selectedstudents_JobPosting");

            entity.HasOne(d => d.Student).WithMany(p => p.JobpostingSelectedstudents)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_jobposting_selectedstudents_Student");
        });

        modelBuilder.Entity<JobpostingSkill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobposting_skill");

            entity.HasIndex(e => e.JobPostingId, "FK_JobPostingSkill_JobPosting_idx");

            entity.HasIndex(e => e.SkillId, "FK_JobPostingSkill_Skill_idx");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.JobpostingSkills)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_JobPostingSkill_JobPosting");

            entity.HasOne(d => d.Skill).WithMany(p => p.JobpostingSkills)
                .HasForeignKey(d => d.SkillId)
                .HasConstraintName("FK_JobPostingSkill_Skill");
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

            entity.HasIndex(e => e.StatusId, "FK_JobPostingEligible_Status_idx");

            entity.HasIndex(e => e.JobPostingId, "FK_jobpostings_eligiblestudents_JobPosting_idx");

            entity.HasIndex(e => e.StudentId, "FK_jobpostings_eligiblestudents_Student_idx");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.JobpostingsEligiblestudents)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_jobpostings_eligiblestudents_JobPosting");

            entity.HasOne(d => d.Status).WithMany(p => p.JobpostingsEligiblestudents)
                .HasForeignKey(d => d.StatusId)
                .HasConstraintName("FK_JobPostingEligible_Status");

            entity.HasOne(d => d.Student).WithMany(p => p.JobpostingsEligiblestudents)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_jobpostings_eligiblestudents_Student");
        });

        modelBuilder.Entity<Jobstudentstatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jobstudentstatus");

            entity.Property(e => e.Name).HasMaxLength(45);
        });

        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("login");

            entity.HasIndex(e => e.CampusId, "FK_Login_Campus_idx");

            entity.HasIndex(e => e.CompanyId, "FK_Login_CompanyData");

            entity.HasIndex(e => e.RoleId, "FK_Login_Role");

            entity.HasIndex(e => e.StudentId, "FK_Login_Student_idx");

            entity.Property(e => e.DateOfRegistration).HasColumnType("datetime");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.UserName).HasMaxLength(50);

            entity.HasOne(d => d.Campus).WithMany(p => p.Logins)
                .HasForeignKey(d => d.CampusId)
                .HasConstraintName("FK_Login_Campus");

            entity.HasOne(d => d.Company).WithMany(p => p.Logins)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_Login_CompanyData");

            entity.HasOne(d => d.Role).WithMany(p => p.Logins)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_Login_UserRole");

            entity.HasOne(d => d.Student).WithMany(p => p.Logins)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_Login_Student");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("messages");

            entity.HasIndex(e => e.ChatId, "FK_Chat_Messages_idx");

            entity.HasIndex(e => e.GroupId, "FK_Group_Messages_idx");

            entity.HasIndex(e => e.ReceiverId, "FK_Receiver_Messages_idx");

            entity.HasIndex(e => e.SenderId, "FK_Sender_Messages_idx");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.MessageText).HasMaxLength(1000);
            entity.Property(e => e.MessageType).HasColumnType("enum('Text','Image','Video','File')");

            entity.HasOne(d => d.Chat).WithMany(p => p.Messages)
                .HasForeignKey(d => d.ChatId)
                .HasConstraintName("FK_Chat_Messages");

            entity.HasOne(d => d.Group).WithMany(p => p.Messages)
                .HasForeignKey(d => d.GroupId)
                .HasConstraintName("FK_Group_Messages");

            entity.HasOne(d => d.Receiver).WithMany(p => p.MessageReceivers)
                .HasForeignKey(d => d.ReceiverId)
                .HasConstraintName("FK_Receiver_Messages");

            entity.HasOne(d => d.Sender).WithMany(p => p.MessageSenders)
                .HasForeignKey(d => d.SenderId)
                .HasConstraintName("FK_Sender_Messages");
        });

        modelBuilder.Entity<Messagestatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("messagestatus");

            entity.HasIndex(e => e.MessageId, "FK_Message_MessageStatus_idx");

            entity.Property(e => e.Status).HasColumnType("enum('Delivered','Read')");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Message).WithMany(p => p.Messagestatuses)
                .HasForeignKey(d => d.MessageId)
                .HasConstraintName("FK_Message_MessageStatus");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("notifications");

            entity.HasIndex(e => e.CampusId, "FK_CampusId_Notifications_idx");

            entity.HasIndex(e => e.CompanyId, "FK_CompanyId_Notifications_idx");

            entity.HasIndex(e => e.StudentId, "FK_StudentId_Notifications_idx");

            entity.HasIndex(e => e.Id, "Id_UNIQUE").IsUnique();

            entity.Property(e => e.CampusId).HasColumnName("campusId");
            entity.Property(e => e.CompanyId).HasColumnName("companyId");
            entity.Property(e => e.NotificationContent).HasMaxLength(255);
            entity.Property(e => e.ParentType).HasMaxLength(45);
            entity.Property(e => e.StudentId).HasColumnName("studentId");
            entity.Property(e => e.Title).HasMaxLength(45);

            entity.HasOne(d => d.Campus).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.CampusId)
                .HasConstraintName("FK_CampusId_Notifications");

            entity.HasOne(d => d.Company).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_CompanyId_Notifications");

            entity.HasOne(d => d.Student).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_StudentId_Notifications");
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

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("skill");

            entity.HasIndex(e => e.SkillTypeId, "FK_Skill_SkillType_idx");

            entity.Property(e => e.Name).HasMaxLength(145);

            entity.HasOne(d => d.SkillType).WithMany(p => p.Skills)
                .HasForeignKey(d => d.SkillTypeId)
                .HasConstraintName("FK_Skill_SkillType");
        });

        modelBuilder.Entity<SkillType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("skill_type");

            entity.Property(e => e.Name).HasMaxLength(245);
        });

        modelBuilder.Entity<Stream>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("stream");

            entity.Property(e => e.Name).HasMaxLength(45);
        });

        modelBuilder.Entity<StudentSemesterMark>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("student_semester_mark");

            entity.HasIndex(e => e.StudentAcademicId, "FK_StudentSemMarks_StudentAcademic_idx");

            entity.Property(e => e.MarkaPercentage).HasPrecision(10);
            entity.Property(e => e.Semester).HasMaxLength(45);
            entity.Property(e => e.Sgpa).HasPrecision(10);
            entity.Property(e => e.Status).HasMaxLength(45);

            entity.HasOne(d => d.StudentAcademic).WithMany(p => p.StudentSemesterMarks)
                .HasForeignKey(d => d.StudentAcademicId)
                .HasConstraintName("FK_StudentSemMarks_StudentAcademic");
        });

        modelBuilder.Entity<StudentSkill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("student_skill");

            entity.HasIndex(e => e.StudentId, "FK_Skill_Student_idx");

            entity.HasIndex(e => e.SkillId, "FK_StudentSkill_Skill_idx");

            entity.HasOne(d => d.Skill).WithMany(p => p.StudentSkills)
                .HasForeignKey(d => d.SkillId)
                .HasConstraintName("FK_StudentSkill_Skill");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentSkills)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_Skill_Student");
        });

        modelBuilder.Entity<Studentacademic>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("studentacademics");

            entity.HasIndex(e => e.StudentId, "FK_StudentAcademy_Student_idx");

            entity.HasIndex(e => e.CourseId, "FK_Student_Course_idx");

            entity.HasIndex(e => e.StreamId, "FK_Student_Stream_idx");

            entity.Property(e => e.Cgpa)
                .HasPrecision(10)
                .HasColumnName("CGPA");
            entity.Property(e => e.DiplomaCollegeName).HasMaxLength(100);
            entity.Property(e => e.TenthBoard).HasMaxLength(145);
            entity.Property(e => e.TenthMarks).HasPrecision(10);
            entity.Property(e => e.TenthSchoolName).HasMaxLength(100);
            entity.Property(e => e.TwelthBoard).HasMaxLength(145);
            entity.Property(e => e.TwelthMarks).HasPrecision(10);
            entity.Property(e => e.TwelthSchoolName).HasMaxLength(100);

            entity.HasOne(d => d.Course).WithMany(p => p.Studentacademics)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_Student_Course");

            entity.HasOne(d => d.Stream).WithMany(p => p.Studentacademics)
                .HasForeignKey(d => d.StreamId)
                .HasConstraintName("FK_Student_Stream");

            entity.HasOne(d => d.Student).WithMany(p => p.Studentacademics)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_StudentAcademy_Student");
        });

        modelBuilder.Entity<Studentplaced>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("studentplaced");

            entity.HasIndex(e => e.BatchId, "FK_StudentPlaced_Batch_idx");

            entity.HasIndex(e => e.JobPostingId, "FK_StudentPlaced_Job_idx");

            entity.HasIndex(e => e.StudentId, "FK_StudentPlaced_Student_idx");

            entity.HasIndex(e => e.OrgId, "FK_StudentPlaces_Campus_idx");

            entity.HasOne(d => d.Batch).WithMany(p => p.Studentplaceds)
                .HasForeignKey(d => d.BatchId)
                .HasConstraintName("FK_StudentPlaced_Batch");

            entity.HasOne(d => d.JobPosting).WithMany(p => p.Studentplaceds)
                .HasForeignKey(d => d.JobPostingId)
                .HasConstraintName("FK_StudentPlaced_Job");

            entity.HasOne(d => d.Org).WithMany(p => p.Studentplaceds)
                .HasForeignKey(d => d.OrgId)
                .HasConstraintName("FK_StudentPlaced_Campus");

            entity.HasOne(d => d.Student).WithMany(p => p.Studentplaceds)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK_StudentPlaced_Student");
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

            entity.HasIndex(e => e.BatchId, "FK_Student_Batch_idx");

            entity.HasIndex(e => e.OrgId, "FK_Student_Campus_idx");

            entity.Property(e => e.AadharCardNumber).HasMaxLength(45);
            entity.Property(e => e.BloodGroup).HasMaxLength(45);
            entity.Property(e => e.CurrentAddress).HasMaxLength(500);
            entity.Property(e => e.DateOfBirth).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FatherName).HasMaxLength(100);
            entity.Property(e => e.FatherPhoneNumber).HasMaxLength(45);
            entity.Property(e => e.FirstName).HasMaxLength(45);
            entity.Property(e => e.Gender).HasMaxLength(45);
            entity.Property(e => e.LastName).HasMaxLength(45);
            entity.Property(e => e.MiddleName).HasMaxLength(45);
            entity.Property(e => e.MotherName).HasMaxLength(100);
            entity.Property(e => e.MotherPhoneNumber).HasMaxLength(45);
            entity.Property(e => e.Pannumber)
                .HasMaxLength(45)
                .HasColumnName("PANNumber");
            entity.Property(e => e.PermanentAddress).HasMaxLength(500);
            entity.Property(e => e.PhoneNumber).HasMaxLength(45);
            entity.Property(e => e.RollNo).HasMaxLength(45);

            entity.HasOne(d => d.Batch).WithMany(p => p.Tblstudents)
                .HasForeignKey(d => d.BatchId)
                .HasConstraintName("FK_Student_Batch");

            entity.HasOne(d => d.Org).WithMany(p => p.Tblstudents)
                .HasForeignKey(d => d.OrgId)
                .HasConstraintName("FK_Student_Campus");
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

        modelBuilder.Entity<Template>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("template");

            entity.HasIndex(e => e.CategoryId, "FK_Template_Category_idx");

            entity.Property(e => e.Body).HasColumnType("text");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(145);
            entity.Property(e => e.Subject).HasMaxLength(245);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");

            entity.HasOne(d => d.Category).WithMany(p => p.Templates)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_Template_Category");
        });

        modelBuilder.Entity<TemplateCategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("template_category");

            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(245);
            entity.Property(e => e.Name).HasMaxLength(105);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
        });

        modelBuilder.Entity<TemplatePlaceholder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("template_placeholder");

            entity.HasIndex(e => e.TemplateId, "FK_TemplatePlaceholder_Template_idx");

            entity.Property(e => e.Description).HasMaxLength(245);
            entity.Property(e => e.Name).HasMaxLength(145);

            entity.HasOne(d => d.Template).WithMany(p => p.TemplatePlaceholders)
                .HasForeignKey(d => d.TemplateId)
                .HasConstraintName("FK_TemplatePlaceholder_Template");
        });

        modelBuilder.Entity<Trainer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("trainers");

            entity.Property(e => e.CompanyName).HasMaxLength(100);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.IsDeleted)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.TrainerType).HasMaxLength(50);
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

        modelBuilder.Entity<University>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("university");

            entity.Property(e => e.Name).HasMaxLength(145);
        });

        modelBuilder.Entity<Userrole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("userrole");

            entity.Property(e => e.Name).HasMaxLength(45);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
