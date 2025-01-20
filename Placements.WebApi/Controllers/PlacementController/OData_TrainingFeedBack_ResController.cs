using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;

namespace Placements.WebApi.Controllers.PlacementController
{
    [Route("odata/Trainingfeedbackres")]
    [ApiController]
    public class OData_TrainingFeedBack_ResController : ODataController
    {
        private readonly PlacementContext _context;

        public OData_TrainingFeedBack_ResController(PlacementContext context)
        {
            _context = context;
        }

        [HttpGet, EnableQuery]
        public IActionResult Get()
        {
            return Ok(_context.Trainingfeedbackres);
        }


        [HttpPost]
        public async Task<IActionResult> Post(Trainingfeedbackre Trainingfeedbackres)
        {
            try
            {

                _context.Trainingfeedbackres.Add(Trainingfeedbackres);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Training Feedback Response Added Successfully" });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Add Training Feedback Response.", exception = ex });
            }
        }


        [HttpPut]
        public async Task<IActionResult> Put(long key, Trainingfeedbackre Trainingfeedbackres)
        {
            try
            {
                Trainingfeedbackre? original = await _context.Trainingfeedbackres.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Training Feedback Response Not Found" });
                }

                if (_context.Entry(Trainingfeedbackres) != null)
                {
                    _context.Entry(Trainingfeedbackres).State = EntityState.Modified;
                }

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Training Feedback Response Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Update Training Feedback Response.", exception = ex });
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(long key, Delta<Trainingfeedbackre> delta)
        {
            try
            {
                Trainingfeedbackre original = await _context.Trainingfeedbackres.FirstOrDefaultAsync(x => x.Id == key);
                if (original == null)
                {
                    return Ok(new { success = false, message = "Training Feedback Response Not Found" });
                }

                delta.Patch(original);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Training Feedback Response Updated Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Training Feedback Response.", exception = ex });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long key)
        {
            try
            {
                Trainingfeedbackre trainer = await _context.Trainingfeedbackres.FirstOrDefaultAsync(x => x.Id == key);
                if (trainer == null)
                {
                    return Ok(new { success = false, message = "Training Feedback Response Not Found" });
                }

                _context.Trainingfeedbackres.Remove(trainer);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Training Feedback Response Deleted Successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Failed to Delete Training Feedback Response.", exception = ex });
            }
        }
    }
}
