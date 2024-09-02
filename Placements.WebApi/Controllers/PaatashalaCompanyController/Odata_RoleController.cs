using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.PaatashalaCampus.Models;
using Placements.DataAccess.PaatashalaCompany.Models;

namespace Placements.WebApi.Controllers.PaatashalaCompanyController
{

  [ApiController]
  [Route("odata/Role")]
  public class Odata_RoleController : ODataController
  {

    private readonly PaatashalacompanydbContext _context;

    public Odata_RoleController(PaatashalacompanydbContext context)
    {
      _context = context;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Roles);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Role role)
    {
      try
      {
        _context.Roles.Add(role);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Role Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Role.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Role role)
    {
      try
      {
        Role? original = await _context.Roles.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Role Not Found" });
        }

        original.RoleName = role.RoleName;
        original.Description = role.Description;
        original.Logins = role.Logins;

        _context.Roles.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Role Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Role.", exception = ex });
      }
    }


    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Role>? delta)
    {
      try
      {
        Role original = await _context.Roles.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Role Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Role Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Role.", exception = ex });
      }
    }


    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Role role = await _context.Roles.FirstOrDefaultAsync(x => x.Id == key);
        if (role == null)
        {
          return Ok(new { success = false, message = "Role Not Found" });
        }

        _context.Roles.Remove(role);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Role Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Role.", exception = ex });
      }
    }
  }
}
