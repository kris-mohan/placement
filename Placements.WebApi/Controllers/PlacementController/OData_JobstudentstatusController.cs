using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Jobstudentstatus")]
    public class OData_JobstudentstatusController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_JobstudentstatusController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Jobstudentstatuses);
            return Ok(_context.Jobstudentstatuses);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Jobstudentstatus jobstudentstatus)
        {
            try
            {
                _context.Jobstudentstatuses.Add(jobstudentstatus);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Job student status Added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Job student status.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Jobstudentstatus jobstudentstatus)
        {
            try
            {
                Jobstudentstatus? original = await _context.Jobstudentstatuses.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Job student status Not Found" });
                }

                original.Name = jobstudentstatus.Name;


                _context.Jobstudentstatuses.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Job student status Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Job student status.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Jobstudentstatus> delta)
        {
            try
            {
                Jobstudentstatus? original = await _context.Jobstudentstatuses.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Job student status Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Job student status Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Job student status.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Jobstudentstatus jobstudentstatus = await _context.Jobstudentstatuses.FirstOrDefaultAsync(x => x.Id == key);
                if (jobstudentstatus == null)
                {
                    return Ok(new { success = false, message = "Job student status Not Found" });
                }

                _context.Jobstudentstatuses.Remove(jobstudentstatus);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Job student status Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Job student status.", exception = ex });
            }
        }

    }
}
