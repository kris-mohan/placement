using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Placements.DataAccess.PaatashalaCampus.Models;
using Placements.DataAccess.PaatashalaCompany.Models;
using Placements.DataAccess.PaatashalaTraining.Models;
using Placements.WebApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Placements.WebApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class WeatherForecastController : ControllerBase
  {
    private static readonly string[] Summaries = new[]
    {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IConfiguration _configuration;
    private readonly PaatashalacampusContext _paatashalacampusContext;
    private readonly PaatashalacompanydbContext _paatashalacompanydbContext;
    private readonly PaatashalatrainingContext _paatashalatrainingContext;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IConfiguration configuration, PaatashalacompanydbContext paatashalacompanydbContext,
      PaatashalacampusContext paatashalacampusContext, PaatashalatrainingContext paatashalatrainingContext)
    {
      _logger = logger;
      _configuration = configuration;
      _paatashalacampusContext= paatashalacampusContext;
      _paatashalacompanydbContext=paatashalacompanydbContext;
      _paatashalatrainingContext = paatashalatrainingContext;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
      return Enumerable.Range(1, 5).Select(index => new WeatherForecast
      {
        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        TemperatureC = Random.Shared.Next(-20, 55),
        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
      })
      .ToArray();
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel user)
    {
      try
      {
        if (user is null)
        {
          return BadRequest("Invalid client request");
        }
        bool isValidUser = false;
        if (user.UserType == "1")
        {
          isValidUser = _paatashalacampusContext.Campusregistrations
              .Any(c => c.Email  == user.UserName || c.CollegeEmail == user.UserName || c.CollegeName == user.UserName && c.Password == user.Password);
        }
        else if (user.UserType == "2")
        {
          isValidUser = _paatashalacompanydbContext.Logins
              .Any(c => c.UserName == user.UserName && c.Password == user.Password);
        }
        //else if (user.UserType == "3")
        //{
        //  isValidUser = _paatashalacampusContext.Campusregistrations
        //      .Any(c => c.Email == user.UserName || c.CollegeEmail == user.UserName || c.CollegeName == user.UserName && c.Password == user.Password);
        //}


        if (isValidUser)
        {
          var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
          var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
          var tokenOptions = new JwtSecurityToken(
              issuer: _configuration["JwtSettings:ValidIssuer"],
              audience: _configuration["JwtSettings:ValidAudience"],
              claims: new List<Claim>(),
              expires: DateTime.Now.AddMinutes(5),
              signingCredentials: signinCredentials
            );

          var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

          var refreshToken = Guid.NewGuid().ToString(); // Generate refresh token

          // Save refresh token with user details (e.g., in the database)

          return Ok(new AuthenticatedResponse
          {
            UserName = user.UserName,
            UserType = user.UserType,
            AccessToken = accessToken,
            RefreshToken = refreshToken
          });
        }
        else
        {
          return Unauthorized(new { success = false, message = "Invalid UserName or Password" });
        }
      }

      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Invalid UserName or Password" });
      }

    }


    [HttpPost("RefreshToken")]
    public IActionResult RefreshToken([FromBody] AuthenticatedResponse tokenRequest)
    {
      if (tokenRequest is null || string.IsNullOrEmpty(tokenRequest.RefreshToken))
      {
        return BadRequest("Invalid client request");
      }

      // Validate the refresh token (e.g., by checking it in the database)
      // If valid, generate a new access token

      var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
      var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
      var tokenOptions = new JwtSecurityToken(
          issuer: _configuration["JwtSettings:ValidIssuer"],
          audience: _configuration["JwtSettings:ValidAudience"],
          claims: new List<Claim>(),
          expires: DateTime.Now.AddMinutes(5), // New access token expiration time
          signingCredentials: signinCredentials
      );
      var newAccessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

      var newRefreshToken = Guid.NewGuid().ToString(); 


      return Ok(new AuthenticatedResponse
      {
        AccessToken = newAccessToken,
        RefreshToken = newRefreshToken
      });
    }
  }

 

}
