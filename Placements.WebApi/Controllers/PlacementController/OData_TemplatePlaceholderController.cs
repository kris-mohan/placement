using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/TemplatePlaceholder")]
    [ApiController]
    public class OData_TemplatePlaceholderController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_TemplatePlaceholderController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.TemplatePlaceholders);
        }

        [HttpPost]
        public async Task<IActionResult> Post(TemplatePlaceholder templatePlaceholder)
        {
            try
            {
                _context.TemplatePlaceholders.Add(templatePlaceholder);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "TemplatePlaceholder Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add TemplatePlaceholder.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, TemplatePlaceholder templatePlaceholder)
        {
            try
            {
                TemplatePlaceholder? original = await _context.TemplatePlaceholders.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "TemplatePlaceholder Not Found" });
                }


                _context.TemplatePlaceholders.Update(templatePlaceholder);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "TemplatePlaceholder Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update TemplatePlaceholder.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<TemplatePlaceholder> delta)
        {
            try
            {
                TemplatePlaceholder? original = await _context.TemplatePlaceholders.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "TemplatePlaceholder Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "TemplatePlaceholder Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update TemplatePlaceholder.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                TemplatePlaceholder? templatePlaceholder = await _context.TemplatePlaceholders.FirstOrDefaultAsync(x => x.Id == key);
                if (templatePlaceholder == null)
                {
                    return Ok(new { success = false, message = "TemplatePlaceholder Not Found" });
                }

                _context.TemplatePlaceholders.Remove(templatePlaceholder);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "TemplatePlaceholder Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete TemplatePlaceholder.", exception = ex });
            }
        }
    }
}
