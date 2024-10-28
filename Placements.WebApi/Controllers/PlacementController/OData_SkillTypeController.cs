using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/SkillType")]

    public class OData_SkillTypeController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_SkillTypeController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.SkillTypes);
        }

        [HttpPost]
        public async Task<IActionResult> Post(SkillType skillType)
        {
            try
            {
                _context.SkillTypes.Add(skillType);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Skill type Added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Skill type.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, SkillType skillType)
        {
            try
            {
                SkillType? original = await _context.SkillTypes.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Skill type Not Found" });
                }

                original.Name = skillType.Name;

                _context.SkillTypes.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Skill type Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Skill type.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<SkillType> delta)
        {
            try
            {
                SkillType? original = await _context.SkillTypes.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Skill type Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Skill type Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Skill type.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                SkillType skillType = await _context.SkillTypes.FirstOrDefaultAsync(x => x.Id == key);
                if (skillType == null)
                {
                    return Ok(new { success = false, message = "Skill type Not Found" });
                }

                _context.SkillTypes.Remove(skillType);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Skill type Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Skill type.", exception = ex });
            }
        }

    }
}
