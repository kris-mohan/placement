using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Trainingfeedbackques")]
    [ApiController]
    public class OData_TrainerFeedback_QueController : ODataController
    {

        private readonly PlacementContext _context;

        public OData_TrainerFeedback_QueController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Trainingfeedbackques);
        }


        [HttpPost]
        public async Task<IActionResult> Post(Trainingfeedbackque trainingfeedbackque)
        {
            try
            {

                _context.Trainingfeedbackques.Add(trainingfeedbackque);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Training Feedback Question Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Training Feedback Question.", exception = ex });
            }
        }


        [HttpPut]
        public async Task<IActionResult> Put(long key, Trainingfeedbackque trainingfeedbackque)
        {
            try
            {
                Trainingfeedbackque? original = await _context.Trainingfeedbackques.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Training Feedback Question Not Found" });
                }

                if(_context.Entry(trainingfeedbackque) != null)
                {
                    _context.Entry(trainingfeedbackque).State = EntityState.Modified;
                }

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Training Feedback Question Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Training Feedback Question.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Trainingfeedbackque> delta)
        {
            try
            {
                Trainingfeedbackque original = await _context.Trainingfeedbackques.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Training Feedback Question Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Training Feedback Question Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Training Feedback Question.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Trainingfeedbackque trainer = await _context.Trainingfeedbackques.FirstOrDefaultAsync(x => x.Id == key);
                if (trainer == null)
                {
                    return Ok(new { success = false, message = "Training Feedback Question Not Found" });
                }

                _context.Trainingfeedbackques.Remove(trainer);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Training Feedback Question Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Training Feedback Question.", exception = ex });
            }
        }
    }
}
