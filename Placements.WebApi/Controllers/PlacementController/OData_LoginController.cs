using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Login")]
    public class OData_LoginController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_LoginController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Logins);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Login login)
        {
            try
            {
                _context.Logins.Add(login);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Login Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Login.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Login login)
        {
            try
            {
                Login? original = await _context.Logins.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Login Not Found" });
                }

                original.CompanyId = login.CompanyId;
                original.UserName = login.UserName;
                original.Password = login.Password;
                original.EmployeeId = login.EmployeeId;
                original.RoleId = login.RoleId;
                original.DateOfRegistration = login.DateOfRegistration;
                original.IsDeleted = login.IsDeleted;
                original.UserType = login.UserType;
                original.IsActive = login.IsActive;


                _context.Logins.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Login Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Login.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Login> delta)
        {
            try
            {
                Login? original = await _context.Logins.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Login Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Login Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Login.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Login login = await _context.Logins.FirstOrDefaultAsync(x => x.Id == key);
                if (login == null)
                {
                    return Ok(new { success = false, message = "Login Not Found" });
                }

                _context.Logins.Remove(login);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Login Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Login.", exception = ex });
            }
        }
    }
}
