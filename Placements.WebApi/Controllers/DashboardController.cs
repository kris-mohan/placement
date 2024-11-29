using Microsoft.AspNetCore.Mvc;
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
            var (data, courseLabels) = await _service.GetYearlyPlacementComparisonAsync();

            return Ok(new
            {
                YearlyComparisonData = data,
                CourseLabels = courseLabels
            });
        }

        [HttpGet("skill-demand")]
        public async Task<IActionResult> GetSkillDemandData()
        {
            var (skillDemandData, skillLabels) = await _service.GetJobSkillDemandDataAsync();

            return Ok(new
            {
                SkillDemandData = skillDemandData,
                SkillLabels = skillLabels
            });
        }
        [HttpGet("monthly-placement-trends")]
        public async Task<IActionResult> GetMonthlyPlacementTrends()
        {
            var (data, monthLabels) = await _service.GetMonthlyPlacementTrendsAsync();
            return Ok(new
            {
                MonthlyTrendsData = data,
                MonthLabels = monthLabels
            });
        }
        [HttpGet("top-companies")]
        public async Task<IActionResult> GetTopHiringCompanies()
        {
            var (data, companyLabels) = await _service.GetTopHiringCompaniesAsync();
            return Ok(new
            {
                TopHiringCompaniesData = data,
                CompanyLabels = companyLabels
            });
        }
        [HttpGet("batch-wise-placements")]
        public async Task<IActionResult> GetBatchWisePlacements()
        {
            var (data, batchLabels) = await _service.GetBatchWisePlacementDataAsync();
            return Ok(new
            {
                BatchPlacementData = data,
                BatchLabels = batchLabels
            });
        }
        [HttpGet("unplaced-students-by-branch")]
        public async Task<IActionResult> GetUnplacedStudentsByBranch()
        {
            var (data, branchLabels) = await _service.GetUnplacedStudentsByBranchAsync();
            return Ok(new
            {
                UnplacedStudentsData = data,
                BranchLabels = branchLabels
            });
        }
        [HttpGet("placement-status")]
        public async Task<IActionResult> GetPlacementStatusSummary()
        {
            var (data, statusLabels) = await _service.GetPlacementStatusSummaryAsync();
            return Ok(new
            {
                PlacementStatusData = data,
                StatusLabels = statusLabels
            });
        }
    }
}
