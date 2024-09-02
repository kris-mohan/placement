using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Placements.DataAccess.PaatashalaCompany.Models;

namespace Placements.WebApi.Controllers.PaatashalaCompanyController
{
  [ApiController]
  [Route("odata/Industry")]
  public class OData_IndustryController : ODataController
  {
    private readonly PaatashalacompanydbContext _context;
    public OData_IndustryController(PaatashalacompanydbContext context)
    {
      _context = context;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Industries);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Industry industry)
    {
      try
      {
        _context.Industries.Add(industry);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Industry Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Industry.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Industry industry)
    {
      try
      {
        Industry? original = await _context.Industries.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Industry Not Found" });
        }

        original.Type = industry.Type;
        original.Description = industry.Description;
        _context.Industries.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Industry Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Industry.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Industry> delta)
    {
      try
      {
        Industry original = await _context.Industries.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Industry Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Industry Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Industry.", exception = ex });
      }
    }



    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Industry industry = await _context.Industries.FirstOrDefaultAsync(x => x.Id == key);
        if (industry == null)
        {
          return Ok(new { success = false, message = "Industry Not Found" });
        }

        _context.Industries.Remove(industry);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Industry Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Industry.", exception = ex });
      }
    }

  }
}
