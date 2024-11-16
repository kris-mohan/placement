using Placements.WebApi.Models.DashboardDTOs;

namespace Placements.WebApi.Services
{
    public interface IDashboardService
    {
        Task<PlacementCategoryResponse> GetStudentPlacementDataAsync();
        Task<(List<int> BranchPlacementSeries, List<string> BranchLabels)> GetBranchPlacementDataAsync();
        Task<List<StudentPlacementSeries>> GetYearlyPlacementComparisonAsync();
    }
}
