using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Studentplaced")]
    public class OData_StudentPlacedController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_StudentPlacedController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Studentplaceds);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Studentplaced studentplaced)
        {
            try
            {
                _context.Studentplaceds.Add(studentplaced);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Placed students Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Placed students.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Studentplaced studentplaced)
        {
            try
            {
                Studentplaced? original = await _context.Studentplaceds.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Placed students Not Found" });
                }

                original.StudentId = studentplaced.StudentId;
                original.OrgId = studentplaced.OrgId;
                original.JobPostingId = studentplaced.JobPostingId;
                original.BatchId = studentplaced.BatchId;

                _context.Studentplaceds.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Placed students Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Placed students.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Studentplaced> delta)
        {
            try
            {
                Studentplaced? original = await _context.Studentplaceds.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Placed students Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Placed students Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Placed students.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Studentplaced studentplaced = await _context.Studentplaceds.FirstOrDefaultAsync(x => x.Id == key);
                if (studentplaced == null)
                {
                    return Ok(new { success = false, message = "Placed students Not Found" });
                }

                _context.Studentplaceds.Remove(studentplaced);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Placed students Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Placed students.", exception = ex });
            }
        }


    }
}
