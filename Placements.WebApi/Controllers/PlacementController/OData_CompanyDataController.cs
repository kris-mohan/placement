using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
  [ApiController]
  [Route("odata/Companydatum")]
  public class OData_CompanyDataController : ODataController
  {
    private readonly PlacementContext _context;

    public OData_CompanyDataController(PlacementContext context)
    {
      _context = context;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Companydata);
    }


    [HttpPost]
    public async Task<IActionResult> Post(Companydatum companydatum)
    {
      try
      {
        _context.Companydata.Add(companydatum);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Company Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Company.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Companydatum companydatum)
    {
      try
      {
        Companydatum? original = await _context.Companydata.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Company data Not Found" });
        }

        original.Url = companydatum.Url;
        original.Name = companydatum.Name;
        original.Address = companydatum.Address;
        original.PhoneNumber = companydatum.PhoneNumber;
        original.AddressLine1 = companydatum.AddressLine1;
        original.Gstnumber = companydatum.Gstnumber;
        original.ContactPerson = companydatum.ContactPerson;
        original.City = companydatum.City;
        original.State = companydatum.State;
        original.ZipCode = companydatum.ZipCode;
        original.Country = companydatum.Country;
        original.ParentCompanyId = companydatum.ParentCompanyId;
        original.Companytechonologies = companydatum.Companytechonologies;
        original.Logins = companydatum.Logins;
        original.Paatashalaregistrations = companydatum.Paatashalaregistrations;

        _context.Companydata.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Company data Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Company data.", exception = ex });
      }
    }


    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Companydatum> delta)
    {
      try
      {
        Companydatum? original = await _context.Companydata.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Company data Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Company data Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Company data.", exception = ex });
      }
    }


    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Companydatum companydatum = await _context.Companydata.FirstOrDefaultAsync(x => x.Id == key);
        if (companydatum == null)
        {
          return Ok(new { success = false, message = "Company data Not Found" });
        }

        _context.Companydata.Remove(companydatum);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Company data Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Company data.", exception = ex });
      }
    }

  }
}
