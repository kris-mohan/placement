namespace Placements.WebApi.Models
{
  public class AuthenticatedResponse
  {
    public string? UserType { get; set; }
    public string? UserName { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
  }
}
