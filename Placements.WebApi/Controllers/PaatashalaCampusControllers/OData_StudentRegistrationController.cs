using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.PaatashalaCampus.Models;
using Placements.DataAccess.PaatashalaCompany.Models;

namespace Placements.WebApi.Controllers.PaatashalaCampusControllers
{
  [ApiController]
  [Route("odata/Studentregistartion")]


  public class OData_StudentRegistrationController : ODataController
  {
    private readonly PaatashalacampusContext _context;
    private readonly PaatashalacompanydbContext _paatashalacompanydbContext;

    public OData_StudentRegistrationController(PaatashalacampusContext context, PaatashalacompanydbContext paatashalacompanydbContext)
    {
      _context = context;
      _paatashalacompanydbContext = paatashalacompanydbContext;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Studentregistartions);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Studentregistartion studentregistartion)
    {
      try
      {
        studentregistartion.DateOfRegistration = DateTime.Now;
        _context.Studentregistartions.Add(studentregistartion);
        await _context.SaveChangesAsync();

        var loginDetails = new Login
        {
          UserName = studentregistartion.Email,
          Password = studentregistartion.Password,
          UserType = studentregistartion.UserType,
          DateOfRegistration = studentregistartion.DateOfRegistration
        };
        _paatashalacompanydbContext.Logins.Add(loginDetails);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Student Registration Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Student Registration.", exception = ex });
      }
    }


    [HttpPut]
    public async Task<IActionResult> Put(long key, Studentregistartion studentregistartion)
    {
      try
      {
        Studentregistartion? original = await _context.Studentregistartions.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Student Registration Not Found" });
        }
        _context.Studentregistartions.Update(studentregistartion);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Student Registration Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Student Registration.", exception = ex });
      }
    }


    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Studentregistartion>? delta)
    {
      try
      {
        Studentregistartion? original = await _context.Studentregistartions.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Student Registration Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Student Registration Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Student Registration.", exception = ex });
      }
    }


    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Studentregistartion studentregistartion = await _context.Studentregistartions.FirstOrDefaultAsync(x => x.Id == key);
        if (studentregistartion == null)
        {
          return Ok(new { success = false, message = "Student Registration Not Found" });
        }

        _context.Studentregistartions.Remove(studentregistartion);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Student Registration Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Student Registration.", exception = ex });
      }
    }
  }
}
