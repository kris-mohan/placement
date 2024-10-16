using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Tblstudent")]
    public class OData_TblStudentController : ODataController
    {
        private readonly PlacementContext _context;

        public OData_TblStudentController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Tblstudents);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Tblstudent tblstudent)
        {
            try
            {
                _context.Tblstudents.Add(tblstudent);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "student Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add student.", exception = ex });
            }
        }


        [HttpPut]
        public async Task<IActionResult> Put(long key, Tblstudent tblstudent)
        {
            try
            {
                Tblstudent? original = await _context.Tblstudents.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "student Not Found" });
                }

                original.OrgId = tblstudent.OrgId;
                original.FirstName = tblstudent.FirstName;
                original.LastName = tblstudent.LastName;
                original.BatchId = tblstudent.BatchId;
                original.AadharCardNumber = tblstudent.AadharCardNumber;
                original.PermanentAddress = tblstudent.PermanentAddress;
                original.CurrentAddress = tblstudent.CurrentAddress;
                original.Email = tblstudent.Email;
                original.PhoneNumber = tblstudent.PhoneNumber;
                original.ParentName = tblstudent.ParentName;
                original.ParentPhoneNumber = tblstudent.ParentPhoneNumber;
                original.DateOfBirth = tblstudent.DateOfBirth;
                original.RollNo = tblstudent.RollNo;


                _context.Tblstudents.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "student Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update student.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Tblstudent>? delta)
        {
            try
            {
                Tblstudent? original = await _context.Tblstudents.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "student Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "student Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update student.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Tblstudent? tblstudent = await _context.Tblstudents.FirstOrDefaultAsync(x => x.Id == key);
                if (tblstudent == null)
                {
                    return Ok(new { success = false, message = "student Not Found" });
                }

                _context.Tblstudents.Remove(tblstudent);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "student Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete student.", exception = ex });
            }
        }
    }
}
