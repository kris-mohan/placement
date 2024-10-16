using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/JobpostingsEligiblestudent")]
    public class OData_JobPostingEligibleStudentsController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_JobPostingEligibleStudentsController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.JobpostingsEligiblestudents);
        }

        [HttpPost]
        public async Task<IActionResult> Post(JobpostingsEligiblestudent jobpostingsEligiblestudent)
        {
            try
            {
                _context.JobpostingsEligiblestudents.Add(jobpostingsEligiblestudent);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Eligible student Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Eligible student.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, JobpostingsEligiblestudent jobpostingsEligiblestudent)
        {
            try
            {
                JobpostingsEligiblestudent? original = await _context.JobpostingsEligiblestudents.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Eligible student Not Found" });
                }

                original.StudentId = jobpostingsEligiblestudent.StudentId;
                original.JobPostingId = jobpostingsEligiblestudent.JobPostingId;
                _context.JobpostingsEligiblestudents.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Eligible student Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Eligible student.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<JobpostingsEligiblestudent> delta)
        {
            try
            {
                JobpostingsEligiblestudent? original = await _context.JobpostingsEligiblestudents.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Eligible student Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Eligible student Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Eligible student.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                JobpostingsEligiblestudent jobpostingsEligiblestudent = await _context.JobpostingsEligiblestudents.FirstOrDefaultAsync(x => x.Id == key);
                if (jobpostingsEligiblestudent == null)
                {
                    return Ok(new { success = false, message = "Eligible student Not Found" });
                }

                _context.JobpostingsEligiblestudents.Remove(jobpostingsEligiblestudent);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Eligible student Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Eligible student.", exception = ex });
            }
        }
    }
}
