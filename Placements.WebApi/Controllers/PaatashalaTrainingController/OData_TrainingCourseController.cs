//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.OData.Deltas;
//using Microsoft.AspNetCore.OData.Query;
//using Microsoft.AspNetCore.OData.Routing.Controllers;
//using Microsoft.EntityFrameworkCore;
//using Placements.DataAccess.PaatashalaCampus.Models;
//using Placements.DataAccess.PaatashalaTraining.Models;

//namespace Placements.WebApi.Controllers.PaatashalaTrainingController
//{
//  [ApiController]
//  [Route("odata/Trainingcourse")]
//  public class OData_TrainingCourseController : ODataController
//  {
//    private readonly PaatashalatrainingContext _context;

//    public OData_TrainingCourseController(PaatashalatrainingContext context)
//    {
//      _context = context;
//    }

//    [HttpGet, EnableQuery]
//    public IActionResult Get()
//    {
//      return Ok(_context.Trainingcourses);
//    }

//    [HttpPost]
//    public async Task<IActionResult> Post(Trainingcourse trainingcourse)
//    {
//      try
//      {
//        _context.Trainingcourses.Add(trainingcourse);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Training course Added Successfully" });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Add Training course.", exception = ex });
//      }
//    }

//    [HttpPut]
//    public async Task<IActionResult> Put(long key, Trainingcourse trainingcourse)
//    {
//      try
//      {
//        Trainingcourse? original = await _context.Trainingcourses.FirstOrDefaultAsync(x => x.Id == key);
//        if (original == null)
//        {
//          return Ok(new { success = false, message = "Training course Not Found" });
//        }

//        original.Name = trainingcourse.Name;
//        original.Description = trainingcourse.Description;
//        original.ValidFrom = trainingcourse.ValidFrom;
//        original.ValidTill = trainingcourse.ValidTill;
//        original.Trainerschedules = trainingcourse.Trainerschedules;
//        original.Trainingmodules = trainingcourse.Trainingmodules;

//        _context.Trainingcourses.Update(original);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Training course Updated Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Update Training course.", exception = ex });
//      }
//    }

//    [HttpPatch]
//    public async Task<IActionResult> Patch(long key, Delta<Trainingcourse>? delta)
//    {
//      try
//      {
//        Trainingcourse original = await _context.Trainingcourses.FirstOrDefaultAsync(x => x.Id == key);
//        if (original == null)
//        {
//          return Ok(new { success = false, message = "Training course Not Found" });
//        }

//        delta.Patch(original);

//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Training course Updated Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Update Training course.", exception = ex });
//      }
//    }

//    [HttpDelete]
//    public async Task<IActionResult> Delete(long key)
//    {
//      try
//      {
//        Trainingcourse trainingcourse = await _context.Trainingcourses.FirstOrDefaultAsync(x => x.Id == key);
//        if (trainingcourse == null)
//        {
//          return Ok(new { success = false, message = "Training courses Not Found" });
//        }

//        _context.Trainingcourses.Remove(trainingcourse);
//        await _context.SaveChangesAsync();

//        return Ok(new { success = true, message = "Training courses Deleted Successfully." });
//      }
//      catch (Exception ex)
//      {
//        return Ok(new { success = false, message = "Failed to Delete Training courses.", exception = ex });
//      }
//    }
//  }
//}
