using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/CompanyJobStream")]
    public class OData_CompanyJobStreamsController : ODataController
    {

        private readonly PlacementContext _context;
        public OData_CompanyJobStreamsController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.CompanyJobStreams);
        }

        [HttpPost]
        public async Task<IActionResult> Post(CompanyJobStream companyJobStream)
        {
            try
            {
                _context.CompanyJobStreams.Add(companyJobStream);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job's stream  Added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Company job's stream .", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, CompanyJobStream companyJobStream)
        {
            try
            {
                CompanyJobStream? original = await _context.CompanyJobStreams.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Company job's stream  Not Found" });
                }

                original.Stream = companyJobStream.Stream;
                original.StreamId = companyJobStream.StreamId;

                _context.CompanyJobStreams.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job's stream  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Company job's stream .", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<CompanyJobStream> delta)
        {
            try
            {
                CompanyJobStream? original = await _context.CompanyJobStreams.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Company job's stream  Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job's stream  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Company job's stream .", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                CompanyJobStream companyJobStream = await _context.CompanyJobStreams.FirstOrDefaultAsync(x => x.Id == key);
                if (companyJobStream == null)
                {
                    return Ok(new { success = false, message = "Company job's stream Not Found" });
                }

                _context.CompanyJobStreams.Remove(companyJobStream);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job's stream Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Company job's stream.", exception = ex });
            }
        }
    }
}
