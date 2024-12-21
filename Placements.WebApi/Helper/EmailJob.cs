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
            var unsentEmails = _dbContext.Emails.Where(e => (bool)!e.IsSent).ToList();

            foreach (var email in unsentEmails)
            {
                try
                {
                    await _emailService.SendEmailAsync(email.To, email.Subject, email.Body, email.Cc, email.Bcc);

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
