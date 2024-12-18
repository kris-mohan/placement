namespace Placements.WebApi.Services
{
    public interface IEmailCreationService
    {
        Task AddEmailAsync(string to, string cc, string subject, string body);
    }
}
