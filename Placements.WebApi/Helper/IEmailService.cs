namespace Placements.WebApi.Helper
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body, string cc = null, string bcc = null, Stream stream = null, string documentName = "",string contentType = "");
    }
}
