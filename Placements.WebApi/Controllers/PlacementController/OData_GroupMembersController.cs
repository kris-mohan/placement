using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Groupmembers")]
    [ApiController]
    public class OData_GroupMembersController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_GroupMembersController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Groupmembers);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Groupmember groupmember)
        {
            try
            {
                _context.Groupmembers.Add(groupmember);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Group member Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Group member.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Groupmember groupmember)
        {
            try
            {
                Groupmember? original = await _context.Groupmembers.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Groupmember Not Found" });
                }

                _context.Groupmembers.Update(groupmember);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Groupmember Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Groupmember.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Groupmember> delta)
        {
            try
            {
                Groupmember? original = await _context.Groupmembers.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Group member Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Group member Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Group member.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Groupmember groupmember = await _context.Groupmembers.FirstOrDefaultAsync(x => x.Id == key);
                if (groupmember == null)
                {
                    return Ok(new { success = false, message = "Group member Not Found" });
                }

                _context.Groupmembers.Remove(groupmember);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Group member Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Group member.", exception = ex });
            }
        }
    }
}
