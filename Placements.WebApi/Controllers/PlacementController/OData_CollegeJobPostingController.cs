using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Collegejobposting")]
    public class OData_CollegeJobPostingController : ODataController
    {
        private readonly PlacementContext _context;

        public OData_CollegeJobPostingController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Collegejobpostings);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Collegejobposting collegejobposting)
        {
            try
            {
                _context.Collegejobpostings.Add(collegejobposting);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "College job posting Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add College job posting.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Collegejobposting collegejobposting)
        {
            try
            {
                Collegejobposting? original = await _context.Collegejobpostings.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "College job posting Event Not Found" });
                }

                original.JobPostingId = collegejobposting.JobPostingId;
                original.CollegeId = collegejobposting.CollegeId;


                _context.Collegejobpostings.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "College job posting Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update College job posting.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Collegejobposting> delta)
        {
            try
            {
                Collegejobposting? original = await _context.Collegejobpostings.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "College job posting Event Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "College job posting Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update College job posting.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Collegejobposting collegejobposting = await _context.Collegejobpostings.FirstOrDefaultAsync(x => x.Id == key);
                if (collegejobposting == null)
                {
                    return Ok(new { success = false, message = "College job posting Not Found" });
                }

                _context.Collegejobpostings.Remove(collegejobposting);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "College job posting Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete College job posting.", exception = ex });
            }
        }

    }
}
