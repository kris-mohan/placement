using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
  [ApiController]
  [Route("odata/Collegejobpostingschedule")]
  public class OData_CollegeJobPostingScheduleController : ODataController
  {
    private readonly PlacementContext _context;

    public OData_CollegeJobPostingScheduleController(PlacementContext context)
    {
      _context = context;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Collegejobpostingschedules);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Collegejobpostingschedule collegejobpostingschedule)
    {
      try
      {
        _context.Collegejobpostingschedules.Add(collegejobpostingschedule);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "College job posting schedule Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add College job posting schedule.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Collegejobpostingschedule collegejobpostingschedule)
    {
      try
      {
        Collegejobpostingschedule? original = await _context.Collegejobpostingschedules.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "College job posting schedule Event Not Found" });
        }

        original.CollegeId = collegejobpostingschedule.CollegeId;
        original.JobPostingId = collegejobpostingschedule.JobPostingId;
        original.ScheduledDate = collegejobpostingschedule.ScheduledDate;
       
        _context.Collegejobpostingschedules.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "College job posting schedule Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update College job posting schedule.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Collegejobpostingschedule> delta)
    {
      try
      {
        Collegejobpostingschedule? original = await _context.Collegejobpostingschedules.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "College job posting schedule Event Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "College job posting schedule Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update College job posting schedule.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Collegejobpostingschedule collegejobpostingschedule = await _context.Collegejobpostingschedules.FirstOrDefaultAsync(x => x.Id == key);
        if (collegejobpostingschedule == null)
        {
          return Ok(new { success = false, message = "College job posting schedule Not Found" });
        }

        _context.Collegejobpostingschedules.Remove(collegejobpostingschedule);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "College job posting schedule Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete College job posting schedule.", exception = ex });
      }
    }
  }
}
