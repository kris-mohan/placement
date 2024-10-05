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
//  [Route("odata/Companytechonology")]
//  public class OData_CompanyTechonolgyController : ODataController
//  {

//    private readonly PaatashalacompanydbContext _context;

//    public OData_CompanyTechonolgyController(PaatashalacompanydbContext context)
//    {
//      _context = context;
//    }

//    [HttpGet, EnableQuery]
//    public IActionResult Get()
//    {
//      return Ok(_context.Companytechonologies);
//    }


//    [HttpPost]
//    public async Task<IActionResult> Post(Companytechonology companytechonology)
//    {
//      try
//      {
//        _context.Companytechonologies.Add(companytechonology);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Company Techonology Added Successfully" });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Add Company Techonology.", exception = ex });
//      }
//    }


//    [HttpPut]
//    public async Task<IActionResult> Put(long key, Companytechonology companytechonology)
//    {
//      try
//      {
//        Companytechonology? original = await _context.Companytechonologies.FirstOrDefaultAsync(x => x.Id == key);
//        if (original == null)
//        {
//          return Ok(new { success = false, message = "Company Techonology Not Found" });
//        }

//        original.Company = companytechonology.Company;
//        original.Technology = companytechonology.Technology;
//        _context.Companytechonologies.Update(original);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Company Techonology Updated Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Update Company Techonology.", exception = ex });
//      }
//    }


//    [HttpPatch]
//    public async Task<IActionResult> Patch(long key, Delta<Companytechonology>? delta)
//    {
//      try
//      {
//        Companytechonology original = await _context.Companytechonologies.FirstOrDefaultAsync(x => x.Id == key);
//        if (original == null)
//        {
//          return Ok(new { success = false, message = "Company Techonology Not Found" });
//        }

//        delta.Patch(original);

//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Company Techonology Updated Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Update Company Techonology.", exception = ex });
//      }
//    }


//    [HttpDelete]
//    public async Task<IActionResult> Delete(long key)
//    {
//      try
//      {
//        Companytechonology companytechonology = await _context.Companytechonologies.FirstOrDefaultAsync(x => x.Id == key);
//        if (companytechonology == null)
//        {
//          return Ok(new { success = false, message = "Company Techonology Not Found" });
//        }

//        _context.Companytechonologies.Remove(companytechonology);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Company Techonology Deleted Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Delete Company Techonology.", exception = ex });
//      }
//    }
//  }
//}
