using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Helper
{
    public class EmailJob
    {
        private readonly PlacementContext _dbContext;

        private readonly IEmailService _emailService;

        public EmailJob(PlacementContext dbContext, IEmailService emailService)
        {
            _dbContext = dbContext;
            _emailService = emailService;
        }

        public async Task ProcessEmailsAsync()
         {
            // Fetch unsent emails from the database
            var unsentEmails = _dbContext.Emails.Include(x => x.Document).Where(e => (bool)!e.IsSent).ToList();

            foreach (var email in unsentEmails)
            {
                try
                {
                    System.IO.Stream stream = null;
                    string? documentPath = email.Document?.FilePath;
                    string? documentName = email.Document?.FileName;
                    string? contentType = email.Document?.FileType;
                    if(!string.IsNullOrEmpty(documentName) && !string.IsNullOrEmpty(documentPath))
                    {
                        // get file by path and pass it to email function to attach

                        // Stream =
                        stream = new FileStream(documentPath, FileMode.Open, FileAccess.Read);
                    }
                    await _emailService.SendEmailAsync(email.To, email.Subject, email.Body, email.Cc, email.Bcc, stream,documentName, contentType);

                    // Mark the email as sent only if no exception occurs
                    email.IsSent = true;
                    email.SentAt = DateTime.Now;
                    _dbContext.Update(email);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to send email to {email.To}: {ex.Message}");
                }
            }

            await _dbContext.SaveChangesAsync();
        }
    }

}
