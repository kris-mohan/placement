using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/CompanyJobBatch")]
    public class OData_CompanyJobBatchController : ODataController
    {

        private readonly PlacementContext _context;
        public OData_CompanyJobBatchController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.CompanyJobBatches);
        }

        [HttpPost]
        public async Task<IActionResult> Post(CompanyJobBatch companyJobBatch)
        {
            try
            {
                _context.CompanyJobBatches.Add(companyJobBatch);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job batch added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Company job batch .", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, CompanyJobBatch companyJobBatch)
        {
            try
            {
                CompanyJobBatch? original = await _context.CompanyJobBatches.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Company job batch  Not Found" });
                }

                original.JobPostingId = companyJobBatch.JobPostingId;
                original.BatchId = companyJobBatch.BatchId;

                _context.CompanyJobBatches.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job batch  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Company job batch .", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<CompanyJobBatch> delta)
        {
            try
            {
                CompanyJobBatch? original = await _context.CompanyJobBatches.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Company job batch  Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job batch  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Company job batch .", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                CompanyJobBatch companyJobBatch = await _context.CompanyJobBatches.FirstOrDefaultAsync(x => x.Id == key);
                if (companyJobBatch == null)
                {
                    return Ok(new { success = false, message = "Company job batch Not Found" });
                }

                _context.CompanyJobBatches.Remove(companyJobBatch);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job batch Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Company job batch.", exception = ex });
            }
        }
    }
}
