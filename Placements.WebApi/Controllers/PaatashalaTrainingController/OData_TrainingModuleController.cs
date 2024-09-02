using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.PaatashalaCampus.Models;
using Placements.DataAccess.PaatashalaTraining.Models;

namespace Placements.WebApi.Controllers.PaatashalaTrainingController
{

  [ApiController]
  [Route("odata/Trainingmodule")]
  public class OData_TrainingModuleController : ODataController
  {
    private readonly PaatashalatrainingContext _context;

    public OData_TrainingModuleController(PaatashalatrainingContext context)
    {
      _context = context;
    }

    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Trainingmodules);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Trainingmodule trainingmodule)
    {
      try
      {
        _context.Trainingmodules.Add(trainingmodule);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Training module Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Training module.", exception = ex });
      }
    }

    [HttpPut]
    public async Task<IActionResult> Put(long key, Trainingmodule trainingmodule)
    {
      try
      {
        Trainingmodule? original = await _context.Trainingmodules.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Training module Not Found" });
        }

        original.Name = trainingmodule.Name;
        original.TrainingCourseId = trainingmodule.TrainingCourseId;
        original.TrainingMode = trainingmodule.TrainingMode;
        original.TrainingAssetFolder = trainingmodule.TrainingAssetFolder;
        original.TrainingCourse = trainingmodule.TrainingCourse;

        _context.Trainingmodules.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Training module Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Training module.", exception = ex });
      }
    }


    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Trainingmodule>? delta)
    {
      try
      {
        Trainingmodule original = await _context.Trainingmodules.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Training module Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Training module Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Training module.", exception = ex });
      }
    }


    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Trainingmodule trainingmodule = await _context.Trainingmodules.FirstOrDefaultAsync(x => x.Id == key);
        if (trainingmodule == null)
        {
          return Ok(new { success = false, message = "Training module Not Found" });
        }

        _context.Trainingmodules.Remove(trainingmodule);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Training module Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Training module.", exception = ex });
      }
    }
  }
}
