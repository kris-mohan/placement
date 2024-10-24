
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Companytechonology")]
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
        public async Task<IActionResult> Post(Companytechnology companytechonology)
        {
            try
            {
                _context.Companytechnologies.Add(companytechonology);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company Techonology Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Company Techonology.", exception = ex });
            }
        }


        [HttpPut]
        public async Task<IActionResult> Put(long key, Companytechnology companytechonology)
        {
            try
            {
                Companytechnology? original = await _context.Companytechnologies.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Company Techonology Not Found" });
                }

                original.Company = companytechonology.Company;
                original.Technology = companytechonology.Technology;
                _context.Companytechnologies.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company Techonology Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Company Techonology.", exception = ex });
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
                    return Ok(new { success = false, message = "Company Techonology Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company Techonology Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Company Techonology.", exception = ex });
            }
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Companytechnology? companytechonology = await _context.Companytechnologies.FirstOrDefaultAsync(x => x.Id == key);
                if (companytechonology == null)
                {
                    return Ok(new { success = false, message = "Company Techonology Not Found" });
                }

                _context.Companytechnologies.Remove(companytechonology);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company Techonology Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Company Techonology.", exception = ex });
            }
        }

    }
}
