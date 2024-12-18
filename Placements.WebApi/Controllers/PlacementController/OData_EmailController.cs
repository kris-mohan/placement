using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Email")]
    public class OData_EmailController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_EmailController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Emails);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Email email)
        {
            try
            {
                _context.Emails.Add(email);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Email Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Email.", exception = ex });
            }
        }
    }
}
