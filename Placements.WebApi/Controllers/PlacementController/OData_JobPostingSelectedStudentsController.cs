using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
  [ApiController]
  [Route("odata/JobpostingSelectedstudent")]
  public class OData_JobPostingSelectedStudentsController :ODataController
  {
    private readonly PlacementContext _context;
    public OData_JobPostingSelectedStudentsController(PlacementContext context)
    {
      _context = context;
    }


    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.JobpostingSelectedstudents);
    }

    [HttpPost]
    public async Task<IActionResult> Post(JobpostingSelectedstudent jobpostingSelectedstudent)
    {
      try
      {
        _context.JobpostingSelectedstudents.Add(jobpostingSelectedstudent);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Selected students Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Selected students.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, JobpostingSelectedstudent jobpostingSelectedstudent)
    {
      try
      {
        JobpostingSelectedstudent? original = await _context.JobpostingSelectedstudents.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Selected students Not Found" });
        }

        original.JobPostingId = jobpostingSelectedstudent.JobPostingId;
        original.StudentId = jobpostingSelectedstudent.StudentId;
        original.HasAcceptedOffer = jobpostingSelectedstudent.HasAcceptedOffer;

        _context.JobpostingSelectedstudents.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Selected students  Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Selected students.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<JobpostingSelectedstudent> delta)
    {
      try
      {
        JobpostingSelectedstudent? original = await _context.JobpostingSelectedstudents.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Selected students Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Selected students Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Selected students.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        JobpostingSelectedstudent jobpostingSelectedstudent = await _context.JobpostingSelectedstudents.FirstOrDefaultAsync(x => x.Id == key);
        if (jobpostingSelectedstudent == null)
        {
          return Ok(new { success = false, message = "Selected students Not Found" });
        }

        _context.JobpostingSelectedstudents.Remove(jobpostingSelectedstudent);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Selected students Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Selected students.", exception = ex });
      }
    }
  }
}
