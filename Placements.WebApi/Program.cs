using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.OData;
using Microsoft.AspNetCore.OData.Batch;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using Microsoft.AspNetCore.OData.NewtonsoftJson;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Placements.DataAccess.PaatashalaCampus.Models;
using MySql.EntityFrameworkCore.Extensions;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.PaatashalaCompany.Models;
using Placements.DataAccess.PaatashalaTraining.Models;



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


builder.Services.AddEntityFrameworkMySQL()
           .AddDbContext<PaatashalacampusContext>(options =>
           {
             options.UseMySQL(builder.Configuration.GetConnectionString("PaatashalaCampusConnection"));
           });
builder.Services.AddEntityFrameworkMySQL()
           .AddDbContext<PaatashalacompanydbContext>(options =>
           {
             options.UseMySQL(builder.Configuration.GetConnectionString("PaatashalaCompanyConnection"));
           });
builder.Services.AddEntityFrameworkMySQL()
           .AddDbContext<PaatashalatrainingContext>(options =>
           {
             options.UseMySQL(builder.Configuration.GetConnectionString("PaatashalaTrainingConnection"));
           });

var app = builder.Build();
app.UseCors(s => s.AllowAnyHeader()
  .AllowAnyMethod()
  .SetIsOriginAllowed((host) => true)
  .AllowCredentials());
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI();
//}
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseRouting();
app.UseCors("AllowAngularDevClient");
app.MapControllers();

app.Run();

static IEdmModel GetEdmModel()
{
  ODataConventionModelBuilder modelBuilder = new ODataConventionModelBuilder();

  modelBuilder.EntitySet<Calendarevent>("Calendarevent");
  modelBuilder.EntitySet<Invitation>("Invitation");
  modelBuilder.EntitySet<Jobposting>("Jobposting");
  modelBuilder.EntitySet<Jobpostingdetail>("Jobpostingdetail");
  modelBuilder.EntitySet<Studentplaced>("Studentplaced");
  modelBuilder.EntitySet<Tblstudent>("Tblstudent");
  modelBuilder.EntitySet<Campusregistration>("Campusregistration");
  modelBuilder.EntitySet<Studentregistartion>("Studentregistartion");

  modelBuilder.EntitySet<Companydatum>("Companydatum");
  modelBuilder.EntitySet<Companytechonology>("Companytechonology");
  modelBuilder.EntitySet<Paatashalaregistration>("Paatashalaregistration");
  modelBuilder.EntitySet<Role>("Role");
  modelBuilder.EntitySet<Technology>("Technology");
  modelBuilder.EntitySet<Industry>("Industry");
  modelBuilder.EntitySet<Companyindustry>("Companyindustry");
  modelBuilder.EntitySet<Login>("Login");
  modelBuilder.EntitySet<Companyregistration>("Companyregistration");

  modelBuilder.EntitySet<Trainer>("Trainer");
  modelBuilder.EntitySet<Trainerschedule>("Trainerschedule");
  modelBuilder.EntitySet<Trainingcourse>("Trainingcourse");
  modelBuilder.EntitySet<Trainingmodule>("Trainingmodule");

  return modelBuilder.GetEdmModel();
}
