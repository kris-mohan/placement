using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Studentregistartion")]
    public class OData_StudentRegistrationController : ODataController
    {
        private readonly PlacementContext _context;

        public OData_StudentRegistrationController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Studentregistartions);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Studentregistartion studentregistartion)
        {
            try
            {
                studentregistartion.DateOfRegistration = DateTime.Now;
                _context.Studentregistartions.Add(studentregistartion);
                await _context.SaveChangesAsync();

                var loginDetails = new Login
                {
                    UserName = studentregistartion.Email,
                    Password = studentregistartion.Password,
                    UserType = studentregistartion.UserType,
                    DateOfRegistration = studentregistartion.DateOfRegistration
                };
                _context.Logins.Add(loginDetails);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student Registartion Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Student Registartion.", exception = ex });
            }
        }


        [HttpPut]
        public async Task<IActionResult> Put(long key, Studentregistartion studentregistartion)
        {
            try
            {
                Studentregistartion? original = await _context.Studentregistartions.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Student Registartion Not Found" });
                }

                original.Name = studentregistartion.Name;
                original.RollNumber = studentregistartion.RollNumber;
                original.Email = studentregistartion.Email;
                original.PhoneNumber = studentregistartion.PhoneNumber;
                original.SchoolId = studentregistartion.SchoolId;
                original.Batch = studentregistartion.Batch;
                original.Branch = studentregistartion.Branch;
                original.IsDeleted = studentregistartion.IsDeleted;
                original.IsActive = studentregistartion.IsActive;
                original.UserType = studentregistartion.UserType;
                original.Password = studentregistartion.Password;
                original.DateOfRegistration = studentregistartion.DateOfRegistration;

                _context.Studentregistartions.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student Registartion Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Student Registartion.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Studentregistartion>? delta)
        {
            try
            {
                Studentregistartion? original = await _context.Studentregistartions.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Student Registartion Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student Registartion Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Student Registartion.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Studentregistartion? studentregistartion = await _context.Studentregistartions.FirstOrDefaultAsync(x => x.Id == key);
                if (studentregistartion == null)
                {
                    return Ok(new { success = false, message = "Student Registartion Not Found" });
                }

                _context.Studentregistartions.Remove(studentregistartion);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student Registartion Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Student Registartion.", exception = ex });
            }
        }
    }
}
