using Placements.WebApi.Models.DashboardDTOs;

namespace Placements.WebApi.Services
{
    public interface IDashboardService
    {
        Task<PlacementCategoryResponse> GetStudentPlacementDataAsync();
        Task<(List<int> BranchPlacementSeries, List<string> BranchLabels)> GetBranchPlacementDataAsync();
        Task<(List<StudentPlacementSeries>, List<string> Labels)> GetYearlyPlacementComparisonAsync();
        Task<(List<StudentPlacementSeries>, List<string> Labels)> GetJobSkillDemandDataAsync();
        Task<(List<int> Data, List<string> Labels)> GetMonthlyPlacementTrendsAsync();
        Task<(List<int> Data, List<string> Labels)> GetTopHiringCompaniesAsync();
        Task<(List<int> Data, List<string> Labels)> GetBatchWisePlacementDataAsync();
        Task<(List<int> Data, List<string> Labels)> GetUnplacedStudentsByBranchAsync();
        Task<(List<int> Data, List<string> Labels)> GetPlacementStatusSummaryAsync();
    }
}
