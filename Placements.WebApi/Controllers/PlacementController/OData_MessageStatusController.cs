using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Messagestatuses")]
    [ApiController]
    public class OData_MessageStatusController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_MessageStatusController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Messagestatuses);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Messagestatus messagestatus)
        {
            try
            {
                _context.Messagestatuses.Add(messagestatus);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Message Status Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Message Status.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Messagestatus messagestatus)
        {
            try
            {
                Messagestatus? original = await _context.Messagestatuses.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Message Status Not Found" });
                }

                _context.Messagestatuses.Update(messagestatus);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Message Status Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Message Status.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Messagestatus> delta)
        {
            try
            {
                Messagestatus? original = await _context.Messagestatuses.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Message Status Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Message Status Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Message Status.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Messagestatus original = await _context.Messagestatuses.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Message Status Not Found" });
                }

                _context.Messagestatuses.Remove(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Message Status Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Message Status.", exception = ex });
            }
        }
    }
}
