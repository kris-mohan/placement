using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.PaatashalaCompany.Models;

namespace Placements.WebApi.Controllers.PaatashalaCompanyController
{
  [ApiController]
  [Route("odata/Companyindustry")]
  public class OData_CompanyIndustryController : ODataController
  {
    private readonly PaatashalacompanydbContext _context;

    public OData_CompanyIndustryController(PaatashalacompanydbContext context)
    {
      _context = context;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Companyindustries);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Companyindustry companyindustry)
    {
      try
      {
        _context.Companyindustries.Add(companyindustry);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = " Industry Added to Company Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Industry to Company.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Companyindustry companyindustry)
    {
      try
      {
        Companyindustry? original = await _context.Companyindustries.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Company Industry Not Found" });
        }

        original.IndustryId = companyindustry.IndustryId;
        original.CompanyId = companyindustry.CompanyId;
        _context.Companyindustries.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Company Industry Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Company Industry.", exception = ex });
      }
    }


    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Companyindustry> delta)
    {
      try
      {
        Companyindustry original = await _context.Companyindustries.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Company Industry Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Company Industry Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Company Industry.", exception = ex });
      }
    }


    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Companyindustry companyindustry = await _context.Companyindustries.FirstOrDefaultAsync(x => x.Id == key);
        if (companyindustry == null)
        {
          return Ok(new { success = false, message = "Company Industry Not Found" });
        }

        _context.Companyindustries.Remove(companyindustry);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Company Industry Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Company Industry.", exception = ex });
      }
    }

  }
}
