using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
  [ApiController]
  [Route("odata/Studentacademic")]
  public class OData_StudentsAcademicsController : ODataController
  {
    private readonly PlacementContext _context;
    public OData_StudentsAcademicsController(PlacementContext context)
    {
      _context = context;
    }


    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Studentacademics);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Studentacademic studentacademic)
    {
      try
      {
        _context.Studentacademics.Add(studentacademic);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Student academic Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Student academic.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Studentacademic studentacademic)
    {
      try
      {
        Studentacademic? original = await _context.Studentacademics.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Student academic Not Found" });
        }

        original.StudentId = studentacademic.StudentId;
        original.CourseId = studentacademic.CourseId;
        original.StreamId = studentacademic.StreamId;
        original.Cgpa = studentacademic.Cgpa;


        _context.Studentacademics.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Student academic Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Student academic.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Calendarevent> delta)
    {
      try
      {
        Calendarevent? original = await _context.Calendarevents.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Student academic Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Student academic Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Student academic.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Studentacademic studentacademic = await _context.Studentacademics.FirstOrDefaultAsync(x => x.Id == key);
        if (studentacademic == null)
        {
          return Ok(new { success = false, message = "Student academic Not Found" });
        }

        _context.Studentacademics.Remove(studentacademic);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Student academic Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Student academic.", exception = ex });
      }
    }

  }
}
