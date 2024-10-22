using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Jobinterviewpanel")]
    public class OData_JobInterviewPanelsController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_JobInterviewPanelsController(PlacementContext context)
        {
            _context = context;
        }
        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Jobinterviewpanels);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Jobinterviewpanel jobinterviewpanel)
        {
            try
            {
                _context.Jobinterviewpanels.Add(jobinterviewpanel);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Panels Added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Panels.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Jobinterviewpanel jobinterviewpanel)
        {
            try
            {
                Jobinterviewpanel? original = await _context.Jobinterviewpanels.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Panels Not Found" });
                }

                original.Description = jobinterviewpanel.Description;
                original.PanelName = jobinterviewpanel.PanelName;
                original.Designation = jobinterviewpanel.Designation;
                _context.Jobinterviewpanels.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Panels Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Panels.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Jobinterviewpanel> delta)
        {
            try
            {
                Jobinterviewpanel? original = await _context.Jobinterviewpanels.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Panels Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Panels Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Panels.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Jobinterviewpanel jobinterviewpanel = await _context.Jobinterviewpanels.FirstOrDefaultAsync(x => x.Id == key);
                if (jobinterviewpanel == null)
                {
                    return Ok(new { success = false, message = "Panels Not Found" });
                }

                _context.Jobinterviewpanels.Remove(jobinterviewpanel);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Panels Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Panels.", exception = ex });
            }
        }
    }

}

