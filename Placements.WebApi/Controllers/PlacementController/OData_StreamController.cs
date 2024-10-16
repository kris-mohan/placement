using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;
using Stream = Placements.DataAccess.Placement.Models.Stream;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Stream")]
    [ApiController]
    public class OData_StreamController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_StreamController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Streams);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Stream stream)
        {
            try
            {
                _context.Streams.Add(stream);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Stream Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Stream.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Stream stream)
        {
            try
            {
                Stream? original = await _context.Streams.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Stream Not Found" });
                }


                _context.Streams.Update(stream);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Stream Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Stream.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Stream> delta)
        {
            try
            {
                Stream? original = await _context.Streams.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Stream Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Stream Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Stream.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Stream stream = await _context.Streams.FirstOrDefaultAsync(x => x.Id == key);
                if (stream == null)
                {
                    return Ok(new { success = false, message = "Stream Not Found" });
                }

                _context.Streams.Remove(stream);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Stream Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Stream.", exception = ex });
            }
        }
    }
}
