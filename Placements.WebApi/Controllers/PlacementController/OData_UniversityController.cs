using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
  [ApiController]
  [Route("odata/University")]
   
    public class OData_UniversityController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_UniversityController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery(MaxExpansionDepth = 10)]
        public IActionResult Get()
        {
            return Ok(_context.Universities);
        }

        [HttpPost]
        public async Task<IActionResult> Post(University university)
        {
            try
            {
                _context.Universities.Add(university);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "University Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add University.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, University university)
        {
            try
            {
                University? original = await _context.Universities.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "University Not Found" });
                }


                _context.Universities.Update(university);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "University Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update University.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<University> delta)
        {
            try
            {
                University? original = await _context.Universities.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "University Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "University Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update University.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                University batch = await _context.Universities.FirstOrDefaultAsync(x => x.Id == key);
                if (batch == null)
                {
                    return Ok(new { success = false, message = "University Not Found" });
                }

                _context.Universities.Remove(batch);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "University Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete University.", exception = ex });
            }
        }
    }
}
