using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
  [ApiController]
  [Route("odata/Campusregistration")]
  public class OData_CampusRegistrationController :ODataController
  {
    private readonly PlacementContext _context;

    public OData_CampusRegistrationController(PlacementContext context)
    {
      _context = context;
    }


    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Campusregistrations);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Campusregistration campusregistration)
    {
      try
      {
        campusregistration.DateOfRegistration = DateTime.Now;
        _context.Campusregistrations.Add(campusregistration);
        await _context.SaveChangesAsync();

        var loginDetails = new Login
        {
          UserName = campusregistration.CollegeEmail,
          Password = campusregistration.Password,
          UserType = campusregistration.UserType,
          DateOfRegistration = campusregistration.DateOfRegistration
        };
        _context.Logins.Add(loginDetails);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Campus Registration Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Campus Registration.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Campusregistration campusregistration)
    {
      try
      {
        Campusregistration? original = await _context.Campusregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Campus Registration Event Not Found" });
        }

        original.CollegeEmail = campusregistration.CollegeEmail;
        original.CollegeName = campusregistration.CollegeName;
        original.PlacementOfficerName = campusregistration.PlacementOfficerName;
        original.Email = campusregistration.Email;
        original.ContactNumber = campusregistration.ContactNumber;
        original.Address = campusregistration.Address;
        original.State = campusregistration.State;
        original.Country = campusregistration.Country;
        original.ZipCode = campusregistration.ZipCode;
        original.DateOfRegistration = campusregistration.DateOfRegistration;
        original.IsDeleted = campusregistration.IsDeleted;
        original.IsActive = campusregistration.IsActive;
        original.UserType = campusregistration.UserType;


        _context.Campusregistrations.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Campus Registration Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Campus Registration.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Campusregistration> delta)
    {
      try
      {
        Campusregistration? original = await _context.Campusregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Campus Registration Event Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Campus Registration Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Campus Registration.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Campusregistration campusregistration = await _context.Campusregistrations.FirstOrDefaultAsync(x => x.Id == key);
        if (campusregistration == null)
        {
          return Ok(new { success = false, message = "Campus Registration Not Found" });
        }

        _context.Campusregistrations.Remove(campusregistration);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Campus Registration Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Campus Registration.", exception = ex });
      }
    }

  }
}
