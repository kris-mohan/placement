using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Userrole")]
    public class OData_UserRoleController : ODataController
    {
        private readonly PlacementContext _context;

        public OData_UserRoleController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Userroles);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Userrole userrole)
        {
            try
            {
                _context.Userroles.Add(userrole);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "User Role Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add User Role.", exception = ex });
            }
        }


        [HttpPut]
        public async Task<IActionResult> Put(long key, Userrole userrole)
        {
            try
            {
                Userrole? original = await _context.Userroles.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "User Role Not Found" });
                }

                original.Name = userrole.Name;
              
                _context.Userroles.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "User Role Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update User Role.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Userrole>? delta)
        {
            try
            {
                Userrole? original = await _context.Userroles.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "User Role Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "User Role Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update User Role.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Userrole? userrole = await _context.Userroles.FirstOrDefaultAsync(x => x.Id == key);
                if (userrole == null)
                {
                    return Ok(new { success = false, message = "User Role Not Found" });
                }

                _context.Userroles.Remove(userrole);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "User Role Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete User Role.", exception = ex });
            }
        }
    }
}
