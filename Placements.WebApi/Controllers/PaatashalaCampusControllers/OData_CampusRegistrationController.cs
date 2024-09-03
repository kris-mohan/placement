using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.PaatashalaCampus.Models;

namespace Placements.WebApi.Controllers.PaatashalaCampusControllers
{
  [ApiController]
  [Route("odata/Campusregistration")]
  public class OData_CampusRegistrationController :ODataController
  {

    private readonly PaatashalacampusContext _context;

    public OData_CampusRegistrationController(PaatashalacampusContext context)
    {
      _context = context;
    }


    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Campusregistrations);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Campusregistration campusregistration)
    {
      try
      {
        campusregistration.DateOfRegistration = DateTime.Now;
        _context.Campusregistrations.Add(campusregistration);
        await _context.SaveChangesAsync();

       return Ok(new { success = true, message = "Campus Registration Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Campus Registration.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Campusregistration campusregistration)
    {
      try
      {
        Campusregistration? original = await _context.Campusregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Campus Registration Not Found" });
        }
        _context.Campusregistrations.Update(campusregistration);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Campus Registration Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Campus Registration.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Campusregistration>? delta)
    {
      try
      {
        Campusregistration? original = await _context.Campusregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Campus Registration Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Campus Registration Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Campus Registration.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Campusregistration campusregistration = await _context.Campusregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (campusregistration == null)
        {
          return Ok(new { success = false, message = "Campus Registration Not Found" });
        }

        _context.Campusregistrations.Remove(campusregistration);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Campus Registration Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Campus Registration.", exception = ex });
      }
    }
  }
}
