using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Technology")]
    public class OData_TechnologyController : ODataController
    {
        private readonly PlacementContext _context;

        public OData_TechnologyController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Technologies);
        }


        [HttpPost]
        public async Task<IActionResult> Post(Technology technology)
        {
            try
            {
                _context.Technologies.Add(technology);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Technology Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Technology.", exception = ex });
            }
        }


        [HttpPut]
        public async Task<IActionResult> Put(long key, Technology technology)
        {
            try
            {
                Technology? original = await _context.Technologies.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Technology Not Found" });
                }

                original.Name = technology.Name;
                original.Description = technology.Description;
                original.Companytechnologies = technology.Companytechnologies;


                _context.Technologies.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Technology Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Technology.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Technology>? delta)
        {
            try
            {
                Technology original = await _context.Technologies.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Technology Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Technology Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Technology.", exception = ex });
            }
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Technology technology = await _context.Technologies.FirstOrDefaultAsync(x => x.Id == key);
                if (technology == null)
                {
                    return Ok(new { success = false, message = "Technology Not Found" });
                }

                _context.Technologies.Remove(technology);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Technology Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Technology.", exception = ex });
            }
        }

    }
}
