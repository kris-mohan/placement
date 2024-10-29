using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{

    [ApiController]
    [Route("odata/Skill")]
    public class OData_SkillController : ODataController
    {

        private readonly PlacementContext _context;
        public OData_SkillController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Skills);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Skill skill)
        {
            try
            {
                _context.Skills.Add(skill);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Skill  Added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Skill .", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Skill skill)
        {
            try
            {
                Skill? original = await _context.Skills.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Skill  Not Found" });
                }

                original.Name = skill.Name;
                original.SkillTypeId = skill.SkillTypeId;

                _context.Skills.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Skill  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Skill .", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Skill> delta)
        {
            try
            {
                Skill? original = await _context.Skills.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Skill  Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Skill  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Skill .", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Skill skill = await _context.Skills.FirstOrDefaultAsync(x => x.Id == key);
                if (skill == null)
                {
                    return Ok(new { success = false, message = "Skill Not Found" });
                }

                _context.Skills.Remove(skill);
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
