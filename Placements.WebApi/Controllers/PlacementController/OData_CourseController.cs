using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Course")]
    [ApiController]
    public class OData_CourseController : ODataController
    {
        private readonly PlacementContext _context;
        public OData_CourseController(PlacementContext context)
        {
            _context = context;
        }


        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Courses);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Course course)
        {
            try
            {
                _context.Courses.Add(course);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Course Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Course.", exception = ex });
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(long key, Course course)
        {
            try
            {
                Course? original = await _context.Courses.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Course Not Found" });
                }


                _context.Courses.Update(course);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Course Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Course.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Course> delta)
        {
            try
            {
                Course? original = await _context.Courses.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Course Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Course Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Course.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Course course = await _context.Courses.FirstOrDefaultAsync(x => x.Id == key);
                if (course == null)
                {
                    return Ok(new { success = false, message = "Course Not Found" });
                }

                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Course Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Course.", exception = ex });
            }
        }
    }
}
