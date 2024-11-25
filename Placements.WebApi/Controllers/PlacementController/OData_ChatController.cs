using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Chats")]
    [ApiController]
    public class OData_ChatController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_ChatController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery(MaxExpansionDepth = 10)]
        public IActionResult Get()
        {
            return Ok(_context.Chats);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Chat chat)
        {
            try
            {
                _context.Chats.Add(chat);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Chat Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Chat.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Chat chat)
        {
            try
            {
                Chat? original = await _context.Chats.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Chat Not Found" });
                }

                _context.Chats.Update(chat);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Chat Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Chat.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Chat> delta)
        {
            try
            {
                Chat? original = await _context.Chats.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Chat Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Chat Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Chat.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Chat chat = await _context.Chats.FirstOrDefaultAsync(x => x.Id == key);
                if (chat == null)
                {
                    return Ok(new { success = false, message = "Chat Not Found" });
                }

                _context.Chats.Remove(chat);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Chat Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Chat.", exception = ex });
            }
        }
    }
}
