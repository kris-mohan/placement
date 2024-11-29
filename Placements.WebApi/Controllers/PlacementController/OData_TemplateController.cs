using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Template")]
    [ApiController]
    public class OData_TemplateController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_TemplateController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Templates);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Template template)
        {
            try
            {
                _context.Templates.Add(template);
                template.CreatedAt = DateTime.Now;
                template.UpdatedAt = DateTime.Now;
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Template Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Template.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Template template)
        {
            try
            {
                Template? original = await _context.Templates.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Template Not Found" });
                }

                template.UpdatedAt = DateTime.Now;
                _context.Templates.Update(template);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Template Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Template.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Template> delta)
        {
            try
            {
                Template? original = await _context.Templates.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Template Not Found" });
                }

                delta.Patch(original);
                original.UpdatedAt = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Template Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Template.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Template? template = await _context.Templates.FirstOrDefaultAsync(x => x.Id == key);
                if (template == null)
                {
                    return Ok(new { success = false, message = "Template Not Found" });
                }

                _context.Templates.Remove(template);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Template Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Template.", exception = ex });
            }
        }
    }
}
