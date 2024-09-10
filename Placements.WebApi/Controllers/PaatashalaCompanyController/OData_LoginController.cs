using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.PaatashalaCampus.Models;
using Placements.DataAccess.PaatashalaCompany.Models;

namespace Placements.WebApi.Controllers.PaatashalaCompanyController
{
  [ApiController]
  [Route("odata/Login")]

  public class OData_LoginController : ODataController
  {
    private readonly PaatashalacompanydbContext _context;

    public OData_LoginController(PaatashalacompanydbContext context)
    {
      _context = context;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Logins);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Login login)
    {
      try
      {
        login.DateOfRegistration = DateTime.Now;

        _context.Logins.Add(login);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Login Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Login.", exception = ex });
      }
    }



    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Login login = await _context.Logins.FirstOrDefaultAsync(x => x.Id == key);
        if (login == null)
        {
          return Ok(new { success = false, message = "Login Not Found" });
        }

        _context.Logins.Remove(login);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Login Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Company data.", exception = ex });
      }
    }
  }


}
