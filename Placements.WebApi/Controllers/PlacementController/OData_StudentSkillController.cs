using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/StudentSkill")]
    public class OData_StudentSkillController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_StudentSkillController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.StudentSkills);
        }

        [HttpPost]
        public async Task<IActionResult> Post(StudentSkill studentSkill)
        {
            try
            {
                _context.StudentSkills.Add(studentSkill);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Skill Added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Skill.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, StudentSkill studentSkill)
        {
            try
            {
                StudentSkill? original = await _context.StudentSkills.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Skill Not Found" });
                }

                original.Name = studentSkill.Name;
                original.SkillTypeId = studentSkill.SkillTypeId;
                original.StudentId = studentSkill.StudentId;

                _context.StudentSkills.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Skill Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Skill.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<StudentSkill> delta)
        {
            try
            {
                StudentSkill? original = await _context.StudentSkills.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Skill Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Skill Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Skill.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                StudentSkill studentSkill = await _context.StudentSkills.FirstOrDefaultAsync(x => x.Id == key);
                if (studentSkill == null)
                {
                    return Ok(new { success = false, message = "Skill Not Found" });
                }

                _context.StudentSkills.Remove(studentSkill);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Skill Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Skill.", exception = ex });
            }
        }

    }
}
