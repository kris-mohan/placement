using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Notification")]
    [ApiController]
    public class OData_NotificationControlller : ODataController
    {
        private readonly PlacementContext _context;
        public OData_NotificationControlller(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery(MaxExpansionDepth = 10)]
        public IActionResult Get()
        {
            return Ok(_context.Notifications);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Notification notification)
        {
            try
            {
                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Notification Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Notification.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Notification notification)
        {
            try
            {
                Notification? original = await _context.Notifications.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Batch Not Found" });
                }


                _context.Notifications.Update(notification);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Notification Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Notification.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Notification> delta)
        {
            try
            {
                Notification? original = await _context.Notifications.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Notification Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Notification Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Notification.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Notification notification = await _context.Notifications.FirstOrDefaultAsync(x => x.Id == key);
                if (notification == null)
                {
                    return Ok(new { success = false, message = "Notification Not Found" });
                }

                _context.Notifications.Remove(notification);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Notification Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Notification.", exception = ex });
            }
        }

    }
}

