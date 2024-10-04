using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
  [ApiController]
  [Route("odata/Paatashalaregistration")]
  public class OData_PaatashalaRegistrationController : ODataController
  {
    private readonly PlacementContext _context;
    public OData_PaatashalaRegistrationController(PlacementContext context)
    {
      _context = context;
    }


    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Paatashalaregistrations);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Paatashalaregistration paatashalaregistration)
    {
      try
      {
        _context.Paatashalaregistrations.Add(paatashalaregistration);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Paatashala Registration Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Paatashala Registration.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Paatashalaregistration paatashalaregistration)
    {
      try
      {
        Paatashalaregistration? original = await _context.Paatashalaregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Paatashala Registration Not Found" });
        }

        original.CompanyId = paatashalaregistration.CompanyId;
        original.OrgId = paatashalaregistration.OrgId;

        _context.Paatashalaregistrations.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Paatashala Registration Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Paatashala Registration.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Paatashalaregistration> delta)
    {
      try
      {
        Paatashalaregistration? original = await _context.Paatashalaregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Paatashala Registration Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Paatashala Registration Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Paatashala Registration.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Paatashalaregistration paatashalaregistration = await _context.Paatashalaregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (paatashalaregistration == null)
        {
          return Ok(new { success = false, message = "Paatashala Registration Not Found" });
        }

        _context.Paatashalaregistrations.Remove(paatashalaregistration);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Paatashala Registration Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Paatashala Registration.", exception = ex });
      }
    }

  }
}
