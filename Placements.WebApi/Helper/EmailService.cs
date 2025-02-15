using System.Net.Mail;
using System.Net;
using Placements.WebApi.Helper;

public class EmailService : IEmailService
{
    public async Task SendEmailAsync(string to, string subject, string body, string cc = null, string bcc = null, Stream stream = null, string documentName = "", string contentType = "")
    {
        try
        {
            using var smtpClient = new SmtpClient("smtpout.secureserver.net") // Ensure this is correct
            {
                Port = 587, // Make sure this matches the SMTP server requirements (e.g., 587, 465)
                Credentials = new NetworkCredential("info@softserveglobal.net", "Softserve54@SSG"),
                EnableSsl = true // Ensure SSL/TLS requirements match the server configuration
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("info@softserveglobal.net"),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            mailMessage.To.Add(to);
            if(stream != null && !string.IsNullOrEmpty(contentType))
            {
                mailMessage.Attachments.Add(new Attachment(stream, documentName, contentType));
            }

            if (!string.IsNullOrEmpty(cc))
            {
                mailMessage.CC.Add(cc);
            }

            if (!string.IsNullOrEmpty(bcc))
            {
                mailMessage.Bcc.Add(bcc);
            }

            await smtpClient.SendMailAsync(mailMessage);
        }
        catch (Exception ex)
        {
            // Properly handle/log exceptions
            throw new InvalidOperationException($"Failed to send email: {ex.Message}", ex);
        }
    }
}
