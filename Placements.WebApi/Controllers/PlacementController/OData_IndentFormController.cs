using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/IndentForm")]
    public class OData_IndentFormController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_IndentFormController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.IndentForms);
        }

        [HttpPost]
        public async Task<IActionResult> Post(IndentForm indentForm)
        {
            try
            {
                _context.IndentForms.Add(indentForm);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Indent Form Added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Indent Form.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, IndentForm indentForm)
        {
            try
            {
                IndentForm? original = await _context.IndentForms.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Indent Form Not Found" });
                }

                original.CompanyName = indentForm.CompanyName;
                original.ContactPersonName = indentForm.ContactPersonName;
                original.ContactPersonDesignation = indentForm.ContactPersonDesignation;
                original.Email = indentForm.Email;
                original.PhoneNumber = indentForm.PhoneNumber;
                original.CreatedAt = indentForm.CreatedAt;
                _context.IndentForms.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Indent Form Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Indent Form.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<IndentForm> delta)
        {
            try
            {
                IndentForm? original = await _context.IndentForms.FirstOrDefaultAsync(x => x.Id == key);
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
                IndentForm indentForm = await _context.IndentForms.FirstOrDefaultAsync(x => x.Id == key);
                if (indentForm == null)
                {
                    return Ok(new { success = false, message = "Indent Form Not Found" });
                }

                _context.IndentForms.Remove(indentForm);
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
