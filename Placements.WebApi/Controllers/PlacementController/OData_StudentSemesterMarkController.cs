using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml.Export.HtmlExport.StyleCollectors.StyleContracts;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/StudentSemesterMark")]
    public class OData_StudentSemesterMarkController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_StudentSemesterMarkController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.StudentSemesterMarks);
        }

        [HttpPost]
        public async Task<IActionResult> Post(StudentSemesterMark studentSemesterMark)
        {
            try
            {
                _context.StudentSemesterMarks.Add(studentSemesterMark);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student Semester Mark  Added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Student Semester Mark .", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, StudentSemesterMark studentSemesterMark)
        {
            try
            {
                StudentSemesterMark? original = await _context.StudentSemesterMarks.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Skill  Not Found" });
                }

                original.Semester = studentSemesterMark.Semester;
                original.Status = studentSemesterMark.Status;
                original.StudentAcademicId = studentSemesterMark.StudentAcademicId;
                original.Sgpa = studentSemesterMark.Sgpa;

                _context.StudentSemesterMarks.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student Semester Mark  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Student Semester Mark .", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<StudentSemesterMark> delta)
        {
            try
            {
                StudentSemesterMark? original = await _context.StudentSemesterMarks.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Student Semester Mark  Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student Semester Mark  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Student Semester Mark .", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                StudentSemesterMark studentSemesterMark = await _context.StudentSemesterMarks.FirstOrDefaultAsync(x => x.Id == key);
                if (studentSemesterMark == null)
                {
                    return Ok(new { success = false, message = "Student Semester Mark Not Found" });
                }

                _context.StudentSemesterMarks.Remove(studentSemesterMark);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student Semester Mark Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Student Semester Mark.", exception = ex });
            }
        }
    }
}
