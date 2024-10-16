using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Invitation")]
    public class OData_InvitationController : ODataController
    {
        private readonly PlacementContext _context;

        public OData_InvitationController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Invitations);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Invitation invitation)
        {
            try
            {
                _context.Invitations.Add(invitation);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Invitation Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Invitation.", exception = ex });
            }
        }


        [HttpPut]
        public async Task<IActionResult> Put(long key, Invitation invitation)
        {
            try
            {
                Invitation? original = await _context.Invitations.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Invitation Not Found" });
                }

                original.InvitationTemplateId = invitation.InvitationTemplateId;
                original.Recipients = invitation.Recipients;
                original.Cc = invitation.Cc;
                original.Bcc = invitation.Bcc;
                original.From = invitation.From;
                original.IsAccepted = invitation.IsAccepted;


                _context.Invitations.Update(invitation);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Invitation Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Invitation.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Invitation>? delta)
        {
            try
            {
                Invitation? original = await _context.Invitations.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Invitation Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Invitation Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Invitation.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Invitation? invitation = await _context.Invitations.FirstOrDefaultAsync(x => x.Id == key);
                if (invitation == null)
                {
                    return Ok(new { success = false, message = "Invitation Not Found" });
                }

                _context.Invitations.Remove(invitation);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Invitation Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Invitation.", exception = ex });
            }
        }
    }
}
