using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Companyregistration")]
    public class OData_CompanyregistrationController : ODataController
    {

        private readonly PlacementContext _context;

        public OData_CompanyregistrationController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Companyregistrations);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Companyregistration companyregistration)
        {
            try
            {
                companyregistration.DateOfRegistration = DateTime.Now;
                _context.Companyregistrations.Add(companyregistration);
                await _context.SaveChangesAsync();

                var loginDetails = new Login
                {
                    UserName = companyregistration.Email,
                    Password = companyregistration.Password,
                    UserType = companyregistration.UserType,
                    DateOfRegistration = companyregistration.DateOfRegistration
                };
                _context.Logins.Add(loginDetails);
                await _context.SaveChangesAsync();

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
                Companyregistration? original = await _context.Companyregistrations.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Company Registration Not Found" });
                }
                _context.Companyregistrations.Update(companyregistration);
                await _context.SaveChangesAsync();

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
                Companyregistration? original = await _context.Companyregistrations.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Company Registration Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

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
                Companyregistration? companyregistration = await _context.Companyregistrations.FirstOrDefaultAsync(x => x.Id == key);
                if (companyregistration == null)
                {
                    return Ok(new { success = false, message = "Company Registration Not Found" });
                }

                _context.Companyregistrations.Remove(companyregistration);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company Registration Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Company Registration.", exception = ex });
            }
        }
    }
}

