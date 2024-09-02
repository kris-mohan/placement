using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IConfiguration configuration)
    {
      _logger = logger;
      _configuration = configuration;
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
      if (user is null)
      {
        return BadRequest("Invalid client request");
      }

      if (user.UserName == "johndoe" && user.Password == "def@123")
      {
        // Generate access token
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
        var tokenOptions = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:ValidIssuer"],
            audience: _configuration["JwtSettings:ValidAudience"],
            claims: new List<Claim>(),
            expires: DateTime.Now.AddMinutes(5), // Access token expiration time
            signingCredentials: signinCredentials
        );
        var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        // Generate refresh token
        var refreshToken = Guid.NewGuid().ToString(); // Use a more secure method for production

        // Save refresh token with user details (e.g., in a database)

        return Ok(new AuthenticatedResponse
        {
          AccessToken = accessToken,
          RefreshToken = refreshToken
        });
      }

      return Unauthorized();
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
