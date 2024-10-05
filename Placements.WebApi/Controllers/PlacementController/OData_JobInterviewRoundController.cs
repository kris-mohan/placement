using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
  [ApiController]
  [Route("odata/Jobinterviewround")]
  public class OData_JobInterviewRoundController :ODataController
  {
    private readonly PlacementContext _context;
    public OData_JobInterviewRoundController(PlacementContext context)
    {
      _context = context;
    }


    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Jobinterviewrounds);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Jobinterviewround jobinterviewround)
    {
      try
      {
        _context.Jobinterviewrounds.Add(jobinterviewround);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Job interview rounds Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Job interview rounds.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Jobinterviewround jobinterviewround)
    {
      try
      {
        Jobinterviewround? original = await _context.Jobinterviewrounds.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Job interview rounds Not Found" });
        }

        original.JobPostingId = jobinterviewround.JobPostingId;
        original.Description = jobinterviewround.Description;
        original.Priority = jobinterviewround.Priority;


        _context.Jobinterviewrounds.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Job interview rounds Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Job interview rounds.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Jobinterviewround> delta)
    {
      try
      {
        Jobinterviewround? original = await _context.Jobinterviewrounds.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Job interview rounds Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Job interview rounds Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Job interview rounds.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Jobinterviewround jobinterviewround = await _context.Jobinterviewrounds.FirstOrDefaultAsync(x => x.Id == key);
        if (jobinterviewround == null)
        {
          return Ok(new { success = false, message = "Job interview rounds Not Found" });
        }

        _context.Jobinterviewrounds.Remove(jobinterviewround);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Job interview rounds Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Job interview rounds.", exception = ex });
      }
    }
  }
}
