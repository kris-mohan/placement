using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
  [ApiController]
  [Route("odata/CollegejobpostingScheduledetail")]
  public class OData_CollegeJobPostingScheduleDetailController :ODataController
  {
    private readonly PlacementContext _context;

    public OData_CollegeJobPostingScheduleDetailController(PlacementContext context)
    {
      _context = context;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.CollegejobpostingScheduledetails);
    }

    [HttpPost]
    public async Task<IActionResult> Post(CollegejobpostingScheduledetail collegejobpostingScheduledetail)
    {
      try
      {
        _context.CollegejobpostingScheduledetails.Add(collegejobpostingScheduledetail);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "College job posting Schedule detail Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add College job posting Schedule detail.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, CollegejobpostingScheduledetail collegejobpostingScheduledetail)
    {
      try
      {
        CollegejobpostingScheduledetail? original = await _context.CollegejobpostingScheduledetails.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "College job posting Schedule detail Not Found" });
        }

        original.Category = collegejobpostingScheduledetail.Category;
        original.Key = collegejobpostingScheduledetail.Key;
        original.Value = collegejobpostingScheduledetail.Value;
       

        _context.CollegejobpostingScheduledetails.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "College job posting Schedule detail Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update College job posting Schedule detail.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<CollegejobpostingScheduledetail> delta)
    {
      try
      {
        CollegejobpostingScheduledetail? original = await _context.CollegejobpostingScheduledetails.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "College job posting Schedule detail Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "College job posting Schedule detail Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update College job posting Schedule detail.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        CollegejobpostingScheduledetail collegejobpostingScheduledetail = await _context.CollegejobpostingScheduledetails.FirstOrDefaultAsync(x => x.Id == key);
        if (collegejobpostingScheduledetail == null)
        {
          return Ok(new { success = false, message = "College job posting Schedule detail Not Found" });
        }

        _context.CollegejobpostingScheduledetails.Remove(collegejobpostingScheduledetail);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "College job posting Schedule detail Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete College job posting Schedule detail.", exception = ex });
      }
    }
  }
}
