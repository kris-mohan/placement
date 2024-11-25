namespace Placements.WebApi.Models.DashboardDTOs
{
    public class PlacementCategoryResponse
    {
        public string[] PlacementCategories { get; set; }
        public List<StudentPlacementSeries> StudentPlacementSeries { get; set; }
    }
}
