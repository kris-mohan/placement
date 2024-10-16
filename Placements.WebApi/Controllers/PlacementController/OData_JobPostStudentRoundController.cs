using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/JobpostStudentround")]
    public class OData_JobPostStudentRoundController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_JobPostStudentRoundController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.JobpostStudentrounds);
        }

        [HttpPost]
        public async Task<IActionResult> Post(JobpostStudentround jobpostStudentround)
        {
            try
            {
                _context.JobpostStudentrounds.Add(jobpostStudentround);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student round Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Student round.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, JobpostStudentround jobpostStudentround)
        {
            try
            {
                JobpostStudentround? original = await _context.JobpostStudentrounds.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Student round Not Found" });
                }

                original.StudentId = jobpostStudentround.StudentId;
                original.JobPostingRoundId = jobpostStudentround.JobPostingRoundId;
                original.Feedback = jobpostStudentround.Feedback;
                original.HasPassed = jobpostStudentround.HasPassed;
                original.Score = jobpostStudentround.Score;
                original.RoundDate = jobpostStudentround.RoundDate;
                original.Col = jobpostStudentround.Col;


                _context.JobpostStudentrounds.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student round Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Student round.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<JobpostStudentround> delta)
        {
            try
            {
                JobpostStudentround? original = await _context.JobpostStudentrounds.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Student round Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student round Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Student round.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                JobpostStudentround jobpostStudentround = await _context.JobpostStudentrounds.FirstOrDefaultAsync(x => x.Id == key);
                if (jobpostStudentround == null)
                {
                    return Ok(new { success = false, message = "Student round Not Found" });
                }

                _context.JobpostStudentrounds.Remove(jobpostStudentround);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student round Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Student round.", exception = ex });
            }
        }
    }
}
