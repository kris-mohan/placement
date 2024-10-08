using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.PaatashalaCampus.Models;

namespace Placements.WebApi.Controllers.PaatashalaCampusControllers
{
  [ApiController]
  [Route("odata/Studentplaced")]
  public class OData_StudentPlacedController : ODataController
  {
   
      private readonly PaatashalacampusContext _context;

      public OData_StudentPlacedController(PaatashalacampusContext context)
      {
        _context = context;
      }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Studentplaceds);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Studentplaced studentplaced)
    {
      try
      {
        _context.Studentplaceds.Add(studentplaced);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Placed Stuednt Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Placed Stuednt.", exception = ex });
      }
    }


    [HttpPut]
    public async Task<IActionResult> Put(long key, Studentplaced studentplaced)
    {
      try
      {
        Studentplaced? original = await _context.Studentplaceds.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Calendar Event Not Found" });
        }
        _context.Studentplaceds.Update(studentplaced);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Placed Stuednt Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Placed Stuednt.", exception = ex });
      }
    }


    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Studentplaced>? delta)
    {
      try
      {
        Studentplaced original = await _context.Studentplaceds.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Placed Stuednt Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Placed Stuednt Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Placed Stuednt.", exception = ex });
      }
    }


    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Studentplaced studentplaced = await _context.Studentplaceds.FirstOrDefaultAsync(x => x.Id == key);
        if (studentplaced == null)
        {
          return Ok(new { success = false, message = "Placed Stuednt Not Found" });
        }

        _context.Studentplaceds.Remove(studentplaced);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Placed Stuednt Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Placed Stuednt.", exception = ex });
      }
    }
  }
}
