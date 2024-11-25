namespace Placements.WebApi.Models
{
  public class AuthenticatedResponse
  {
    public long? Id { get; set; }
    public long? UserRoleId { get; set; }
    public string? UserName { get; set; }
    public string? CollegeName { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public long? CampusId { get; set; }
    public long? CompanyId { get; set; }
    public long? StudentId { get; set; }

    }
}
