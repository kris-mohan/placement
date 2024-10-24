
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Companytechnology")]
    public class OData_CompanyTechnologyController : ODataController
    {
        private readonly PlacementContext _context;

        public OData_CompanyTechnologyController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Companytechnologies);
        }


        [HttpPost]
        public async Task<IActionResult> Post(Companytechnology companytechnology)
        {
            try
            {
                _context.Companytechnologies.Add(companytechnology);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company Technology Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Company Technology.", exception = ex });
            }
        }


        [HttpPut]
        public async Task<IActionResult> Put(long key, Companytechnology companytechnology)
        {
            try
            {
                Companytechnology? original = await _context.Companytechnologies.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Company Technology Not Found" });
                }

                original.Company = companytechnology.Company;
                original.Technology = companytechnology.Technology;
                _context.Companytechnologies.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company Technology Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Company Technology.", exception = ex });
            }
        }


        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Companytechnology>? delta)
        {
            try
            {
                Companytechnology original = await _context.Companytechnologies.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Company Technology Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company Technology Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Company Technology.", exception = ex });
            }
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Companytechnology companytechonology = await _context.Companytechnologies.FirstOrDefaultAsync(x => x.Id == key);
                if (companytechonology == null)
                {
                    return Ok(new { success = false, message = "Company Technology Not Found" });
                }

                _context.Companytechnologies.Remove(companytechonology);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company Technology Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Company Technology.", exception = ex });
            }
        }

    }
}
