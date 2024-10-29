using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/CompanyJobCourse")]
    public class OData_CompanyJobCourseController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_CompanyJobCourseController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.CompanyJobCourses);
        }

        [HttpPost]
        public async Task<IActionResult> Post(CompanyJobCourse companyJobCourse)
        {
            try
            {
                _context.CompanyJobCourses.Add(companyJobCourse);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job course added Succesfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Company job course .", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, CompanyJobCourse companyJobCourse)
        {
            try
            {
                CompanyJobCourse? original = await _context.CompanyJobCourses.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Company job course  Not Found" });
                }

                original.JobPostingId = companyJobCourse.JobPostingId;
                original.CourseId = companyJobCourse.CourseId;

                _context.CompanyJobCourses.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job course  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Company job course .", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<CompanyJobCourse> delta)
        {
            try
            {
                CompanyJobCourse? original = await _context.CompanyJobCourses.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Company job course  Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job course  Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Company job course .", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                CompanyJobCourse companyJobCourse = await _context.CompanyJobCourses.FirstOrDefaultAsync(x => x.Id == key);
                if (companyJobCourse == null)
                {
                    return Ok(new { success = false, message = "Company job course Not Found" });
                }

                _context.CompanyJobCourses.Remove(companyJobCourse);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Company job course Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Company job course.", exception = ex });
            }
        }
    }
}
