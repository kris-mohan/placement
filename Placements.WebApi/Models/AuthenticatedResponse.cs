namespace Placements.WebApi.Models
{
  public class AuthenticatedResponse
  {
    public int? UserType { get; set; }
    public string? UserName { get; set; }
    public string? CollegeName { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }

  }
}
