using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.PaatashalaCampus.Models;

namespace Placements.WebApi.Controllers.PaatashalaCampusControllers
{
  [ApiController]
  [Route("odata/Tblstudent")]
  public class OData_TblStudentController :ODataController
  {
    private readonly PaatashalacampusContext _context;

    public OData_TblStudentController(PaatashalacampusContext context)
    {
      _context = context;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Tblstudents);
    }


    [HttpPost]
    public async Task<IActionResult> Post(Tblstudent tblstudent)
    {
      try
      {
        _context.Tblstudents.Add(tblstudent);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Students Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Students.", exception = ex });
      }
    }

      [HttpPut]
      public async Task<IActionResult> Put(long key, Tblstudent tblstudent)
      {
        try
        {
        Tblstudent? original = await _context.Tblstudents.FirstOrDefaultAsync(x => x.Id == key);
          if (original == null)
          {
            return Ok(new { success = false, message = "Student Not Found" });
          }
          _context.Tblstudents.Update(tblstudent);
          await _context.SaveChangesAsync();

          return Ok(new { success = true, message = "Student Updated Successfully." });
        }
        catch (Exception ex)
        {
          return Ok(new { success = false, message = "Failed to Update Student.", exception = ex });
        }
      
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Tblstudent>? delta)
    {
      try
      {
        Tblstudent? original = await _context.Tblstudents.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Student Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Student Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Student.", exception = ex });
      }
    }


    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Tblstudent tblstudent = await _context.Tblstudents.FirstOrDefaultAsync(x => x.Id == key);
        if (tblstudent == null)
        {
          return Ok(new { success = false, message = "Student Not Found" });
        }

        _context.Tblstudents.Remove(tblstudent);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Student Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Student.", exception = ex });
      }
    }

  }
}
