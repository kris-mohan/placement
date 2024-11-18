using Google.Protobuf;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Messages")]
    [ApiController]
    public class OData_MessagesController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_MessagesController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Messages);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Message message)
        {
            try
            {
                _context.Messages.Add(message);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Message Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Message.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Message course)
        {
            try
            {
                Message? original = await _context.Messages.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Message Not Found" });
                }

                _context.Messages.Update(course);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Message Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Message.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Message> delta)
        {
            try
            {
                Message? original = await _context.Messages.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Message Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Message Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Message.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Message message = await _context.Messages.FirstOrDefaultAsync(x => x.Id == key);
                if (message == null)
                {
                    return Ok(new { success = false, message = "Message Not Found" });
                }

                _context.Messages.Remove(message);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Message Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Message.", exception = ex });
            }
        }
    }
}
