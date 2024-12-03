using Hangfire;
using Hangfire.MySql;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.OData;
using Microsoft.AspNetCore.OData.Batch;
using Microsoft.AspNetCore.OData.NewtonsoftJson;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using MySql.EntityFrameworkCore.Extensions;
using Placements.DataAccess.Placement.Models;
using Placements.WebApi.Helper;
using Placements.WebApi.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var handler = new DefaultODataBatchHandler();
handler.MessageQuotas.MaxNestingDepth = 1000;
handler.MessageQuotas.MaxOperationsPerChangeset = 1000;
handler.MessageQuotas.MaxReceivedMessageSize = 10000;

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers()
          .AddODataNewtonsoftJson()
          .AddOData(options => options.Select().Filter().Count().OrderBy().Expand().SetMaxTop(100)
          .AddRouteComponents("odata", GetEdmModel(), handler));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var validIssuer = jwtSettings["ValidIssuer"];
var validAudience = jwtSettings["ValidAudience"];
var secretKey = jwtSettings["SecretKey"];

// Configure the HTTP request pipeline.


builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = validIssuer,
            ValidAudience = validAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
        };
    });

builder.Services.AddHangfire(config =>
{
    var options = new MySqlStorageOptions
    {
        TablesPrefix = "Hangfire" // Optional; change as needed
    };
    config.UseStorage(new MySqlStorage(builder.Configuration.GetConnectionString("HangfireConnection"), options));
});

builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddTransient<EmailJob>();
builder.Services.AddHangfireServer();

builder.Services.AddEntityFrameworkMySQL()
           .AddDbContext<PlacementContext>(options =>
           {
               options.UseMySQL(builder.Configuration.GetConnectionString("PlacementConnectionString"));
           });
builder.Services.AddScoped<IDashboardService, DashboardService>();
//builder.Services.AddSession();
var app = builder.Build();
app.UseCors(s => s.AllowAnyHeader()
  .AllowAnyMethod()
  .SetIsOriginAllowed((host) => true)
  .AllowCredentials());
app.UseStaticFiles();
//if (app.Environment.IsDevelopment())
//{
app.UseStaticFiles();
app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
    RequestPath = "/static",
    EnableDirectoryBrowsing = true
});
app.UseODataBatching();
//app.UseSession();
app.UseRouting();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHangfireDashboard();
//}
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseRouting();
app.UseCors("AllowAngularDevClient");
app.MapControllers();
var scope = app.Services.CreateScope();
var emailJob = scope.ServiceProvider.GetRequiredService<EmailJob>();
RecurringJob.AddOrUpdate("process-emails-job", () => emailJob.ProcessEmailsAsync(), Cron.Minutely);


app.Run();

static IEdmModel GetEdmModel()
{
    ODataConventionModelBuilder modelBuilder = new ODataConventionModelBuilder();

    modelBuilder.EntitySet<Calendarevent>("Calendarevent");
    modelBuilder.EntitySet<Campusregistration>("Campusregistration");
    modelBuilder.EntitySet<Collegejobposting>("Collegejobposting");
    modelBuilder.EntitySet<Collegejobpostingschedule>("Collegejobpostingschedule");
    modelBuilder.EntitySet<CollegejobpostingScheduledetail>("CollegejobpostingScheduledetail");
    modelBuilder.EntitySet<Companydesignation>("Companydesignation");
    modelBuilder.EntitySet<Companyindustry>("Companyindustry");
    modelBuilder.EntitySet<Companyregistration>("Companyregistration");
    modelBuilder.EntitySet<Companytechnology>("Companytechnology");
    modelBuilder.EntitySet<Industry>("Industry");
    modelBuilder.EntitySet<Invitation>("Invitation");
    modelBuilder.EntitySet<Jobinterviewround>("Jobinterviewround");
    modelBuilder.EntitySet<Jobposting>("Jobposting");
    modelBuilder.EntitySet<Jobpostingdetail>("Jobpostingdetail");
    modelBuilder.EntitySet<JobpostingSelectedstudent>("JobpostingSelectedstudent");
    modelBuilder.EntitySet<JobpostingsEligiblestudent>("JobpostingsEligiblestudent");
    modelBuilder.EntitySet<JobpostStudentround>("JobpostStudentround");
    modelBuilder.EntitySet<Login>("Login");
    modelBuilder.EntitySet<CampusCompany>("CampusCompany");
    modelBuilder.EntitySet<Role>("Role");
    modelBuilder.EntitySet<Studentacademic>("Studentacademic");
    //modelBuilder.EntitySet<Studentplaced>("Studentplaced");
    modelBuilder.EntitySet<Studentregistartion>("Studentregistartion");
    modelBuilder.EntitySet<Tblstudent>("Tblstudent");
    modelBuilder.EntitySet<Technology>("Technology");
    modelBuilder.EntitySet<Trainer>("Trainer");
    modelBuilder.EntitySet<Trainerschedule>("Trainerschedule");
    modelBuilder.EntitySet<Trainingcourse>("Trainingcourse");
    modelBuilder.EntitySet<Trainingmodule>("Trainingmodule");
    modelBuilder.EntitySet<Companydatum>("Companydatum");
    modelBuilder.EntitySet<Course>("Course");
    modelBuilder.EntitySet<Batch>("Batch");
    modelBuilder.EntitySet<Userrole>("Userrole");
    modelBuilder.EntitySet<Jobinterviewpanel>("Jobinterviewpanel");
    modelBuilder.EntitySet<IndentForm>("IndentForm");
    modelBuilder.EntitySet<IndentFormDynamicField>("IndentFormDynamicField");
    modelBuilder.EntitySet<Jobstudentstatus>("Jobstudentstatus");
    modelBuilder.EntitySet<StudentSkill>("StudentSkill");
    modelBuilder.EntitySet<SkillType>("SkillType");
    modelBuilder.EntitySet<Skill>("Skill");
    modelBuilder.EntitySet<JobpostingSkill>("JobpostingSkill");
    modelBuilder.EntitySet<CompanyJobBatch>("CompanyJobBatch");
    modelBuilder.EntitySet<CompanyJobCourse>("CompanyJobCourse");
    modelBuilder.EntitySet<StudentSemesterMark>("StudentSemesterMark");
    modelBuilder.EntitySet<Placements.DataAccess.Placement.Models.Stream>("Stream");
    modelBuilder.EntitySet<University>("University");
    modelBuilder.EntitySet<Groupmember>("Groupmembers");
    modelBuilder.EntitySet<Group>("Groups");
    modelBuilder.EntitySet<Message>("Messages");
    modelBuilder.EntitySet<Messagestatus>("Messagestatuses");
    modelBuilder.EntitySet<Chat>("Chats");
    modelBuilder.EntitySet<TemplateCategory>("TemplateCategory");
    modelBuilder.EntitySet<Template>("Template");
    modelBuilder.EntitySet<TemplatePlaceholder>("TemplatePlaceholder");
    modelBuilder.EntitySet<Document>("Document");

    return modelBuilder.GetEdmModel();
}
