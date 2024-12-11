using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/CampusCompany")]
    public class OData_CampusCompanyController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_CampusCompanyController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery(MaxExpansionDepth = 10)]
        public IActionResult Get()
        {
            return Ok(_context.CampusCompanies);
        }

        [HttpPost]
        public async Task<IActionResult> Post(CampusCompany campusCompany)
        {
            try
            {
                _context.CampusCompanies.Add(campusCompany);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Campus's company Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Campus's compan.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, CampusCompany campusCompany)
        {
            try
            {
                CampusCompany? original = await _context.CampusCompanies.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Campus's compan Not Found" });
                }

                original.CompanyId = campusCompany.CompanyId;
                original.CampusId = campusCompany.CampusId;

                _context.CampusCompanies.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Campus's compan Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Campus's compan.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<CampusCompany> delta)
        {
            try
            {
                CampusCompany? original = await _context.CampusCompanies.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Campus's company Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Campus's compan Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Campus's company.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                CampusCompany campusCompany = await _context.CampusCompanies.FirstOrDefaultAsync(x => x.Id == key);
                if (campusCompany == null)
                {
                    return Ok(new { success = false, message = "Campus's company Not Found" });
                }

                _context.CampusCompanies.Remove(campusCompany);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Campus's compan Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Campus's company.", exception = ex });
            }
        }

    }
}
