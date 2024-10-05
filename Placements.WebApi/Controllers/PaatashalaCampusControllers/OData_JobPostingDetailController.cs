//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.OData.Deltas;
//using Microsoft.AspNetCore.OData.Query;
//using Microsoft.AspNetCore.OData.Routing.Controllers;
//using Microsoft.EntityFrameworkCore;
//using Placements.DataAccess.PaatashalaCampus.Models;

//namespace Placements.WebApi.Controllers.PaatashalaCampusControllers
//{
//  [ApiController]
//  [Route("odata/Jobpostingdetail")]
//  public class OData_JobPostingDetailController : ODataController

//  {
//    private readonly PaatashalacampusContext _context;

//    public OData_JobPostingDetailController(PaatashalacampusContext context)
//    {
//      _context = context;
//    }


//    [HttpGet, EnableQuery]
//    public IActionResult Get()
//    {
//      return Ok(_context.Jobpostingdetails);
//    }


//    [HttpPost]
//    public async Task<IActionResult> Post(Jobpostingdetail jobpostingdetail)
//    {
//      try
//      {
//        _context.Jobpostingdetails.Add(jobpostingdetail);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Job Posting details Added Successfully" });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Add Job Posting details.", exception = ex });
//      }
//    }


//    [HttpPut]
//    public async Task<IActionResult> Put(long key, Jobpostingdetail jobpostingdetail)
//    {
//      try
//      {
//        Jobpostingdetail? original = await _context.Jobpostingdetails.FirstOrDefaultAsync(x => x.Id == key);
//        if (original == null)
//        {
//          return Ok(new { success = false, message = "Job Posting details Not Found" });
//        }

//        original.Streams = jobpostingdetail.Streams;


//        _context.Jobpostingdetails.Update(jobpostingdetail);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Job Posting details Updated Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Update Job Posting details.", exception = ex });
//      }
//    }

//    [HttpPatch]
//    public async Task<IActionResult> Patch(long key, Delta<Jobpostingdetail>? delta)
//    {
//      try
//      {
//        Jobpostingdetail original = await _context.Jobpostingdetails.FirstOrDefaultAsync(x => x.Id == key);
//        if (original == null)
//        {
//          return Ok(new { success = false, message = "Job Posting details Not Found" });
//        }

//        delta.Patch(original);

//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Job Posting details Updated Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Update Job Posting details.", exception = ex });
//      }
//    }


//    [HttpDelete]
//    public async Task<IActionResult> Delete(long key)
//    {
//      try
//      {
//        Jobpostingdetail jobpostingdetail = await _context.Jobpostingdetails.FirstOrDefaultAsync(x => x.Id == key);
//        if (jobpostingdetail == null)
//        {
//          return Ok(new { success = false, message = "Job Posting details Not Found" });
//        }

//        _context.Jobpostingdetails.Remove(jobpostingdetail);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Job Posting details Deleted Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Delete Calendar Event.", exception = ex });
//      }
//    }
//  }

//}
