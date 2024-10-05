//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.OData.Deltas;
//using Microsoft.AspNetCore.OData.Query;
//using Microsoft.AspNetCore.OData.Routing.Controllers;
//using Microsoft.EntityFrameworkCore;
//using Placements.DataAccess.PaatashalaCampus.Models;
//using Placements.DataAccess.PaatashalaCompany.Models;

//namespace Placements.WebApi.Controllers.PaatashalaCompanyController
//{
//  [ApiController]
//  [Route("odata/Paatashalaregistration")]
//  public class OData_PaatshalaRegistrationController : ODataController
//  {
//    private readonly PaatashalacompanydbContext _context;

//    public OData_PaatshalaRegistrationController(PaatashalacompanydbContext context)
//    {
//      _context = context;
//    }


//    [HttpGet, EnableQuery]
//    public IActionResult Get()
//    {
//      return Ok(_context.Paatashalaregistrations);
//    }


//    [HttpPost]
//    public async Task<IActionResult> Post(Paatashalaregistration paatashalaregistration)
//    {
//      try
//      {
//        _context.Paatashalaregistrations.Add(paatashalaregistration);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Registered Successfully" });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Register.", exception = ex });
//      }
//    }


//    [HttpPut]
//    public async Task<IActionResult> Put(long key, Paatashalaregistration paatashalaregistration)
//    {
//      try
//      {
//        Paatashalaregistration? original = await _context.Paatashalaregistrations.FirstOrDefaultAsync(x => x.Id == key);
//        if (original == null)
//        {
//          return Ok(new { success = false, message = "Registered Not Found" });
//        }

//        original.Company = paatashalaregistration.Company;
//        _context.Paatashalaregistrations.Update(original);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Registeration Updated Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Update Registeration.", exception = ex });
//      }
//    }

//    [HttpPatch]
//    public async Task<IActionResult> Patch(long key, Delta<Paatashalaregistration>? delta)
//    {
//      try
//      {
//        Paatashalaregistration original = await _context.Paatashalaregistrations.FirstOrDefaultAsync(x => x.Id == key);
//        if (original == null)
//        {
//          return Ok(new { success = false, message = "Registered details Not Found" });
//        }

//        delta.Patch(original);

//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Registeration Updated Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Update Registeration.", exception = ex });
//      }
//    }


//    [HttpDelete]
//    public async Task<IActionResult> Delete(long key)
//    {
//      try
//      {
//        Paatashalaregistration paatashalaregistration = await _context.Paatashalaregistrations.FirstOrDefaultAsync(x => x.Id == key);
//        if (paatashalaregistration == null)
//        {
//          return Ok(new { success = false, message = "Registered details Not Found" });
//        }

//        _context.Paatashalaregistrations.Remove(paatashalaregistration);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Registeration Deleted Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Delete Registeration.", exception = ex });
//      }
//    }
//  }
//}
