
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Services
{
    public class EmailCreationService : IEmailCreationService
    {
        private readonly PlacementContext _context;
        public EmailCreationService(PlacementContext context)
        {
            _context = context;
        }
        public async Task AddEmailAsync(string to, string cc, string subject, string body)
        {
            var email = new Email
            {
                To = to,
                Cc = cc,
                Subject = subject,
                Body = body,
                IsSent = false,
                CreatedAt = DateTime.Now,
            };

            _context.Emails.Add(email);
            await _context.SaveChangesAsync();
        }
    }
}
