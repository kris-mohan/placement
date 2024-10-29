using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/JobpostingSkill")]
    public class OData_JobPostingSkillController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_JobPostingSkillController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.JobpostingSkills);
        }

        [HttpPost]
        public async Task<IActionResult> Post(JobpostingSkill jobpostingSkill)
        {
            try
            {
                _context.JobpostingSkills.Add(jobpostingSkill);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Job posting Skill  Added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Job posting Skill .", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, JobpostingSkill jobpostingSkill)
        {
            try
            {
                JobpostingSkill? original = await _context.JobpostingSkills.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Job posting Skill  Not Found" });
                }

                original.JobPostingId = jobpostingSkill.JobPostingId;
                original.SkillId = jobpostingSkill.SkillId;

                _context.JobpostingSkills.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Job posting Skill  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Job posting Skill .", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<JobpostingSkill> delta)
        {
            try
            {
                JobpostingSkill? original = await _context.JobpostingSkills.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Job posting Skill  Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Job posting Skill  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Job posting Skill .", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                JobpostingSkill jobpostingSkill = await _context.JobpostingSkills.FirstOrDefaultAsync(x => x.Id == key);
                if (jobpostingSkill == null)
                {
                    return Ok(new { success = false, message = "Job posting Skill Not Found" });
                }

                _context.JobpostingSkills.Remove(jobpostingSkill);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Job posting Skill Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Job posting Skill.", exception = ex });
            }
        }
    }
}
