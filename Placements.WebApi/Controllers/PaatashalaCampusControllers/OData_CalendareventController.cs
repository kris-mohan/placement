using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.PaatashalaCampus.Models;

namespace Placements.WebApi.Controllers.PaatashalaCampusControllers
{
  [ApiController]
  [Route("odata/Calendarevent")]
  public class OData_CalendareventController : ODataController
  {
    private readonly PaatashalacampusContext _context;

    public OData_CalendareventController(PaatashalacampusContext context)
    {
      _context = context;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Calendarevents);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Calendarevent calendarevent)
    {
      try
      {
        _context.Calendarevents.Add(calendarevent);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Calendar Event Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Calendar Event.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Calendarevent calendarevent)
    {
      try
      {
        Calendarevent? original = await _context.Calendarevents.FirstOrDefaultAsync(x => x.Id == key);
        if(original == null)
        {
          return Ok(new { success = false, message = "Calendar Event Not Found" });
        }
    
        original.EventStartDateTime = calendarevent.EventStartDateTime;
        original.EventEndDateTime = calendarevent.EventEndDateTime;
        original.EventType = calendarevent.EventType;
        original.EventDescription = calendarevent.EventDescription;


        _context.Calendarevents.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Calendar Event Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Calendar Event.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Calendarevent> delta)
    {
      try
      {
        Calendarevent? original = await _context.Calendarevents.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null) {
          return Ok(new { success = false, message = "Calendar Event Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Calendar Event Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Calendar Event.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Calendarevent calendarevent = await _context.Calendarevents.FirstOrDefaultAsync(x => x.Id == key);
        if (calendarevent == null)
        {
          return Ok(new { success = false, message = "Calendar Event Not Found" });
        }

        _context.Calendarevents.Remove(calendarevent);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Calendar Event Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Calendar Event.", exception = ex });
      }
    }
  }
}
