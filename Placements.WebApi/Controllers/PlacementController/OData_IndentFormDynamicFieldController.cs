using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/IndentFormDynamicField")]
    public class OData_IndentFormDynamicFieldController :ODataController
    {
        private readonly PlacementContext _context;
        public OData_IndentFormDynamicFieldController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.IndentFormDynamicFields);
        }

        [HttpPost]
        public async Task<IActionResult> Post(IndentFormDynamicField indentFormDynamicField)
        {
            try
            {
                _context.IndentFormDynamicFields.Add(indentFormDynamicField);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Indent Form Added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Indent Form.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, IndentFormDynamicField indentFormDynamicField )
        {
            try
            {
                IndentFormDynamicField? original = await _context.IndentFormDynamicFields.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Indent Form Not Found" });
                }

                original.IndentFormId = indentFormDynamicField.IndentFormId;
                original.Name = indentFormDynamicField.Name;
                original.Value = indentFormDynamicField.Value;
              
                _context.IndentFormDynamicFields.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Indent Form Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Indent Form.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<IndentFormDynamicField> delta)
        {
            try
            {
                IndentFormDynamicField? original = await _context.IndentFormDynamicFields.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Indent Form Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Indent Form Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Indent Form.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                IndentFormDynamicField indentFormDynamicField = await _context.IndentFormDynamicFields.FirstOrDefaultAsync(x => x.Id == key);
                if (indentFormDynamicField == null)
                {
                    return Ok(new { success = false, message = "Indent Form Not Found" });
                }

                _context.IndentFormDynamicFields.Remove(indentFormDynamicField);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Indent Form Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Indent Form.", exception = ex });
            }
        }

    }
}
