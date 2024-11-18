namespace Placements.WebApi.Models.DashboardDTOs
{
    public class StudentPlacementSeries
    {
        public string Name { get; set; } = string.Empty;
        public List<int> Data { get; set; } = new List<int>();
    }
}
