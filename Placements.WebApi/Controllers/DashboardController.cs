using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;
using Placements.WebApi.Services;

namespace Placements.WebApi.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _service;
        private readonly PlacementContext _context;

        public DashboardController(IDashboardService service, PlacementContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpGet("placements-by-gender")]
        public async Task<IActionResult> GenderWiseStudentsPlacedByBranch()
        {
            return Ok();
        }

        [HttpGet("GetStudentPlacementData")]
        public async Task<IActionResult> GetStudentPlacementData()
        {
            var result = await _service.GetStudentPlacementDataAsync();
            return Ok(result);
        }

        [HttpGet("branch-placements")]
        public async Task<IActionResult> GetBranchPlacements()
        {
            var data = await _service.GetBranchPlacementDataAsync();

            return Ok(new
            {
                BranchPlacementSeries = data.BranchPlacementSeries,
                BranchLabels = data.BranchLabels
            });
        }

        [HttpGet("yearly-placement-comparison")]
        public async Task<IActionResult> GetYearlyPlacementComparison()
        {
            var data = await _service.GetYearlyPlacementComparisonAsync();

            // Add course labels for the client-side chart
            var courseLabels = await _context.Courses
                .Select(c => c.Name ?? "Unknown")
                .OrderBy(c => c)
                .ToListAsync();

            return Ok(new
            {
                YearlyComparisonData = data,
                CourseLabels = courseLabels
            });
        }
    }
}
