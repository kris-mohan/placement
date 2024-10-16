using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Batch")]
    [ApiController]
    public class Odata_BatchController : ODataController
    {
        private readonly PlacementContext _context;
        public Odata_BatchController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Batches);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Batch batch)
        {
            try
            {
                _context.Batches.Add(batch);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Batch Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Batch.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Batch batch)
        {
            try
            {
                Batch? original = await _context.Batches.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Batch Not Found" });
                }


                _context.Batches.Update(batch);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Batch Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Batch.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Batch> delta)
        {
            try
            {
                Batch? original = await _context.Batches.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Batch Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Batch Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Batch.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Batch batch = await _context.Batches.FirstOrDefaultAsync(x => x.Id == key);
                if (batch == null)
                {
                    return Ok(new { success = false, message = "Batch Not Found" });
                }

                _context.Batches.Remove(batch);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Batch Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Batch.", exception = ex });
            }
        }
    }
}
