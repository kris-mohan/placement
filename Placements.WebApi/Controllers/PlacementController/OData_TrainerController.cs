using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
  [ApiController]
  [Route("odata/Trainer")]
  public class OData_TrainerController :ODataController
  {
    private readonly PlacementContext _context;

    public OData_TrainerController(PlacementContext context)
    {
      _context = context;
    }


    [HttpGet, EnableQuery]
    public IActionResult Get()
    {
      return Ok(_context.Trainers);
    }


    [HttpPost]
    public async Task<IActionResult> Post(Trainer trainer)
    {
      try
      {
        _context.Trainers.Add(trainer);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Trainer Added Successfully" });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Add Trainer.", exception = ex });
      }
    }


    [HttpPut]
    public async Task<IActionResult> Put(long key, Trainer trainer)
    {
      try
      {
        Trainer? original = await _context.Trainers.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Trainer Not Found" });
        }

        original.Name = trainer.Name;
        original.Email = trainer.Email;
        original.PhoneNumber = trainer.PhoneNumber;
        original.Password = trainer.Password;
        original.Trainerschedules = trainer.Trainerschedules;

        _context.Trainers.Update(original);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Trainer Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Trainer.", exception = ex });
      }
    }

    [HttpPatch]
    public async Task<IActionResult> Patch(long key, Delta<Trainer>? delta)
    {
      try
      {
        Trainer original = await _context.Trainers.FirstOrDefaultAsync(x => x.Id == key);
        if (original == null)
        {
          return Ok(new { success = false, message = "Trainer Not Found" });
        }

        delta.Patch(original);

        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Trainer Updated Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Update Trainer.", exception = ex });
      }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(long key)
    {
      try
      {
        Trainer trainer = await _context.Trainers.FirstOrDefaultAsync(x => x.Id == key);
        if (trainer == null)
        {
          return Ok(new { success = false, message = "Trainer Not Found" });
        }

        _context.Trainers.Remove(trainer);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = "Trainer Deleted Successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new { success = false, message = "Failed to Delete Trainer.", exception = ex });
      }
    }
  }
}
