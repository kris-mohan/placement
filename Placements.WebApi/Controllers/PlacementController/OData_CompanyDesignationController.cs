using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
  [ApiController]
  [Route("odata/Companydesignation")]
  public class OData_CompanyDesignationController : ODataController
  {
    private readonly PlacementContext _context;

    public OData_CompanyDesignationController(PlacementContext context)
    {
      _context = context;
    }


    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Companydesignations);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Companydesignation companydesignation)
    {
      try
      {
        _context.Companydesignations.Add(companydesignation);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Company designation Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Company designation.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Companydesignation companydesignation)
    {
      try
      {
        Companydesignation? original = await _context.Companydesignations.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Company designation Event Not Found" });
        }

        original.CompanyId = companydesignation.CompanyId;
        original.Name = companydesignation.Name;
        


        _context.Companydesignations.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Company designation Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Company designation.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Companydesignation> delta)
    {
      try
      {
        Companydesignation? original = await _context.Companydesignations.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Company designation Event Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Company designation Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Company designation.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Companydesignation companydesignation = await _context.Companydesignations.FirstOrDefaultAsync(x => x.Id == key);
        if (companydesignation == null)
        {
          return Ok(new { success = false, message = "Company designation Not Found" });
        }

        _context.Companydesignations.Remove(companydesignation);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Company designation Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Company designation.", exception = ex });
      }
    }


  }
}
