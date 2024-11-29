using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/TemplateCategory")]
    [ApiController]
    public class OData_TemplateCategoryController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_TemplateCategoryController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.TemplateCategories);
        }

        [HttpPost]
        public async Task<IActionResult> Post(TemplateCategory templateCategory)
        {
            try
            {
                templateCategory.CreatedAt = DateTime.Now;
                templateCategory.UpdatedAt = DateTime.Now;
                _context.TemplateCategories.Add(templateCategory);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "TemplateCategory Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add TemplateCategory.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, TemplateCategory templateCategory)
        {
            try
            {
                TemplateCategory? original = await _context.TemplateCategories.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "TemplateCategory Not Found" });
                }

                templateCategory.UpdatedAt = DateTime.Now;
                _context.TemplateCategories.Update(templateCategory);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "TemplateCategory Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update TemplateCategory.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<TemplateCategory> delta)
        {
            try
            {
                TemplateCategory? original = await _context.TemplateCategories.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "TemplateCategory Not Found" });
                }

                delta.Patch(original);
                original.UpdatedAt = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "TemplateCategory Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update TemplateCategory.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                TemplateCategory? templateCategory = await _context.TemplateCategories.FirstOrDefaultAsync(x => x.Id == key);
                if (templateCategory == null)
                {
                    return Ok(new { success = false, message = "TemplateCategory Not Found" });
                }

                _context.TemplateCategories.Remove(templateCategory);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "TemplateCategory Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete TemplateCategory.", exception = ex });
            }
        }
    }
}
