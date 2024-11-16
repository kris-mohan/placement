using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;


namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Groups")]
    [ApiController]
    public class Odata_GroupsController : ODataController
    {
        private readonly PlacementContext _context;
        public Odata_GroupsController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Groups);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Group group)
        {
            try
            {
                _context.Groups.Add(group);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Group Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Group.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Group group)
        {
            try
            {
                Group? original = await _context.Groups.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Group Not Found" });
                }


                _context.Groups.Update(group);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Group Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Group.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Group> delta)
        {
            try
            {
                Group? original = await _context.Groups.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Group Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Group Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Group.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Group group = await _context.Groups.FirstOrDefaultAsync(x => x.Id == key);
                if (group == null)
                {
                    return Ok(new { success = false, message = "Group Not Found" });
                }

                _context.Groups.Remove(group);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Group Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Group.", exception = ex });
            }
        }

    }
}
