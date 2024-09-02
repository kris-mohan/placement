using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.PaatashalaCampus.Models;

namespace Placements.WebApi.Controllers.PaatashalaCampusControllers
{
  [ApiController]
  [Route("odata/Jobposting")]
  public class OData_JobPostingController : ODataController
  {

    private readonly PaatashalacampusContext _context;

    public OData_JobPostingController(PaatashalacampusContext context)
    {
      _context = context;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Jobpostings);
    }


    [HttpPost]
    public async Task<IActionResult> Post(Jobposting jobposting)
    {
      try
      {
        _context.Jobpostings.Add(jobposting);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Jobposting Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Jobposting.", exception = ex });
      }
    }


    [HttpPut]
    public async Task<IActionResult> Put(long key, Jobposting jobposting)
    {
      try
      {
        Jobposting? original = await _context.Jobpostings.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Jobposting Not Found" });
        }

        original.JobRole = jobposting.JobRole;
        original.JobDescription = jobposting.JobDescription;
        original.ValidFrom = original.ValidFrom;
        original.ValidTill = original.ValidTill;
        original.Positions = original.Positions;
        original.QuantityFilled = original.QuantityFilled;
        original.IsClosed = original.IsClosed;


        _context.Jobpostings.Update(jobposting);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Jobposting Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Jobposting.", exception = ex });
      }
    }


    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Jobposting>? delta)
    {
      try
      {
        Jobposting original = await _context.Jobpostings.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Job Posting Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Job Posting Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Job Posting.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Jobposting jobposting = await _context.Jobpostings.FirstOrDefaultAsync(x => x.Id == key);
        if (jobposting == null)
        {
          return Ok(new { success = false, message = "Job Posting Not Found" });
        }

        _context.Jobpostings.Remove(jobposting);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Job Posting Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Job Posting.", exception = ex });
      }
    }
  }
}
