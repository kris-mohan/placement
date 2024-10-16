using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [ApiController]
    [Route("odata/Trainerschedule")]
    public class OData_TrainerScheduleController : ODataController
    {
        private readonly PlacementContext _context;

        public OData_TrainerScheduleController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Trainerschedules);
        }


        [HttpPost]
        public async Task<IActionResult> Post(Trainerschedule trainerschedule)
        {
            try
            {

                _context.Trainerschedules.Add(trainerschedule);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Trainer schedule Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Trainer schedule.", exception = ex });
            }
        }


        [HttpPut]
        public async Task<IActionResult> Put(long key, Trainerschedule trainerschedule)
        {
            try
            {
                Trainerschedule? original = await _context.Trainerschedules.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Trainer schedule Not Found" });
                }

                original.StartDate = trainerschedule.StartDate;
                original.EndDate = trainerschedule.EndDate;
                original.TrainerId = trainerschedule.TrainerId;
                original.ScheduleType = trainerschedule.ScheduleType;
                original.StudentId = trainerschedule.StudentId;
                original.Course = trainerschedule.Course;
                original.Trainer = trainerschedule.Trainer;

                _context.Trainerschedules.Update(original);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Trainer schedule Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Trainer schedule.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Trainerschedule> delta)
        {
            try
            {
                Trainerschedule original = await _context.Trainerschedules.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Trainer schedule Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Trainer schedule Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Trainer schedule.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Trainerschedule trainer = await _context.Trainerschedules.FirstOrDefaultAsync(x => x.Id == key);
                if (trainer == null)
                {
                    return Ok(new { success = false, message = "Trainer schedule Not Found" });
                }

                _context.Trainerschedules.Remove(trainer);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Trainer schedule Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Trainer schedule.", exception = ex });
            }
        }
    }
}
