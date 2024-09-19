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
  [Route("odata/Companyregistration")]
  public class OData_CompanyRegistrationController :ODataController
  {

    private readonly PaatashalacompanydbContext _paatashalacompanydbContext;

    public OData_CompanyRegistrationController(PaatashalacampusContext context, PaatashalacompanydbContext paatashalacompanydbContext)
    {
      _paatashalacompanydbContext = paatashalacompanydbContext;
    }


    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_paatashalacompanydbContext.Companyregistrations);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Companyregistration companyregistration)
    {
      try
      {
        companyregistration.DateOfRegistration = DateTime.Now;
        _paatashalacompanydbContext.Companyregistrations.Add(companyregistration);
        await _paatashalacompanydbContext.SaveChangesAsync();

        var loginDetails = new Login
        {
          UserName = companyregistration.Email,
          Password = companyregistration.Password,
          UserType = companyregistration.UserType,
          DateOfRegistration = companyregistration.DateOfRegistration
        };
        _paatashalacompanydbContext.Logins.Add(loginDetails);
        await _paatashalacompanydbContext.SaveChangesAsync();

        return Ok(new { success = true, message = "Company Registration Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Company Registration.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Companyregistration companyregistration)
    {
      try
      {
        Companyregistration? original = await _paatashalacompanydbContext.Companyregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Company Registration Not Found" });
        }
        _paatashalacompanydbContext.Companyregistrations.Update(companyregistration);
        await _paatashalacompanydbContext.SaveChangesAsync();

        return Ok(new { success = true, message = "Company Registration Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Company Registration.", exception = ex });
      }
    }


    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Companyregistration>? delta)
    {
      try
      {
        Companyregistration? original = await _paatashalacompanydbContext.Companyregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Company Registration Not Found" });
        }

        delta.Patch(original);

        await _paatashalacompanydbContext.SaveChangesAsync();

        return Ok(new { success = true, message = "Company Registration Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Company Registration.", exception = ex });
      }
    }


    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Companyregistration? companyregistration = await _paatashalacompanydbContext.Companyregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (companyregistration == null)
        {
          return Ok(new { success = false, message = "Company Registration Not Found" });
        }

        _paatashalacompanydbContext.Companyregistrations.Remove(companyregistration);
        await _paatashalacompanydbContext.SaveChangesAsync();

        return Ok(new { success = true, message = "Company Registration Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Company Registration.", exception = ex });
      }
    }
  }
}
