using Microsoft.EntityFrameworkCore;
using Placements.DataAccess.Placement.Models;
using Placements.WebApi.Models.DashboardDTOs;

namespace Placements.WebApi.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly PlacementContext _context;

        public DashboardService(PlacementContext context)
        {
            _context = context;
        }

        public async Task<PlacementCategoryResponse> GetStudentPlacementDataAsync()
        {
            var studentPlacements = await _context.Studentplaceds
        .Include(sp => sp.Student)
            .ThenInclude(s => s.Studentacademics)
                .ThenInclude(sa => sa.Course)
        .Include(sp => sp.JobPosting)
            .ThenInclude(jp => jp.Company)
        .ToListAsync();

            // Group data by course and company
            var groupedData = studentPlacements
                .Where(sp => sp.Student != null && sp.Student.Studentacademics.Any() && sp.JobPosting != null && sp.JobPosting.Company != null)
                .GroupBy(sp => new
                {
                    CourseName = sp.Student.Studentacademics.First().Course.Name,
                    CompanyName = sp.JobPosting.Company.Name
                })
                .Select(group => new
                {
                    CourseName = group.Key.CourseName,
                    CompanyName = group.Key.CompanyName,
                    StudentCount = group.Count()
                })
                .ToList();

            // List of unique company names (Placement Categories)
            var placementCategories = groupedData
                .Select(g => g.CompanyName)
                .Distinct()
                .ToList();

            // List of courses with their placement data
            var studentPlacementSeries = groupedData
                .GroupBy(g => g.CourseName)
                .Select(courseGroup => new StudentPlacementSeries
                {
                    Name = courseGroup.Key,
                    Data = placementCategories
                        .Select(company => courseGroup.FirstOrDefault(cg => cg.CompanyName == company)?.StudentCount ?? 0)
                        .ToList()
                })
                .ToList();

            return new PlacementCategoryResponse
            {
                PlacementCategories = placementCategories.ToArray(),
                StudentPlacementSeries = studentPlacementSeries
            };
        }

        public async Task<(List<int> BranchPlacementSeries, List<string> BranchLabels)> GetBranchPlacementDataAsync()
        {
            // Query to fetch and group student placements by course
            var query = await _context.Studentplaceds
                .Include(sp => sp.Student)
                    .ThenInclude(s => s.Studentacademics)
                        .ThenInclude(sa => sa.Course)
                .GroupBy(sp => sp.Student!.Studentacademics.FirstOrDefault()!.Course!.Name)
                .Select(g => new
                {
                    CourseName = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            // Prepare the response
            var branchLabels = query.Select(q => q.CourseName ?? "Unknown").ToList();
            var branchPlacementSeries = query.Select(q => q.Count).ToList();

            return (branchPlacementSeries, branchLabels);
        }

        public async Task<(List<StudentPlacementSeries>, List<string> Labels)> GetYearlyPlacementComparisonAsync()
        {
            // Querying the data
            var query = await _context.Studentplaceds
                .Include(sp => sp.Student)
                    .ThenInclude(s => s.Studentacademics)
                        .ThenInclude(sa => sa.Course)
                .Include(sp => sp.Batch)
                .GroupBy(sp => new { Year = sp.Batch!.Name, Course = sp.Student!.Studentacademics.FirstOrDefault()!.Course!.Name })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Course = g.Key.Course ?? "Unknown",
                    Count = g.Count()
                })
                .ToListAsync();

            // Preparing unique years and courses
            var years = query.Select(q => q.Year).Distinct().OrderBy(y => y).ToList();
            var courses = query.Select(q => q.Course).Distinct().OrderBy(c => c).ToList();

            // Structuring the data
            var yearlyComparisonData = years.Select(year => new StudentPlacementSeries
            {
                Name = year,
                Data = courses.Select(course => query
                    .Where(q => q.Year == year && q.Course == course)
                    .Sum(q => q.Count)).ToList()
            }).ToList();

            return (yearlyComparisonData, courses);
        }

        public async Task<(List<StudentPlacementSeries>, List<string> Labels)> GetJobSkillDemandDataAsync()
        {
            var skillDemandDataList = new List<StudentPlacementSeries>();

            // Get all companies
            var companies = await _context.Companydata
                .Include(x => x.Jobpostings)
                .ThenInclude(x => x.JobpostingSkills)
                .ThenInclude(x => x.Skill)
                .Where(c => c.IsDeleted == 0 && c.IsActive == 1)
                .ToListAsync();
            var skillLabels = companies.SelectMany(x => x.Jobpostings).SelectMany(x => x.JobpostingSkills).Select(x => x.Skill.Name).ToList();

            foreach (var company in companies)
            {
                var demandData = new int[skillLabels.Count];

                foreach (var jobPosting in company.Jobpostings)
                {
                    for (int i = 0; i < skillLabels.Count; i++)
                    {
                        // Match the skill with the skillLabels
                        var skill = jobPosting.JobpostingSkills.Select(x => x.Skill).Where(s => s.Name == skillLabels[i]).Count();
                        demandData[i] += skill;
                    }
                }

                // Add the result to the list
                skillDemandDataList.Add(new StudentPlacementSeries
                {
                    Name = company.Name,
                    Data = demandData.ToList()
                });
            }

            return (skillDemandDataList, skillLabels);
        }
        public async Task<(List<int> Data, List<string> Labels)> GetMonthlyPlacementTrendsAsync()
        {
            var query = await _context.Studentplaceds
                .Where(sp => sp.JobPosting.DriveDate.HasValue)
                .GroupBy(sp => sp.JobPosting.DriveDate.Value.Month)
                .Select(g => new
                {
                    Month = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            var monthLabels = Enumerable.Range(1, 12).Select(i => new DateTime(1, i, 1).ToString("MMMM")).ToList();
            var data = monthLabels.Select((_, index) => query.FirstOrDefault(q => q.Month == index + 1)?.Count ?? 0).ToList();

            return (data, monthLabels);
        }
        public async Task<(List<int> Data, List<string> Labels)> GetTopHiringCompaniesAsync()
        {
            var query = await _context.Studentplaceds
                .Include(sp => sp.JobPosting)
                .ThenInclude(jp => jp.Company)
                .GroupBy(sp => sp.JobPosting!.Company!.Name)
                .Select(g => new
                {
                    CompanyName = g.Key,
                    Count = g.Count()
                })
                .OrderByDescending(g => g.Count)
                .Take(10)
                .ToListAsync();

            var data = query.Select(q => q.Count).ToList();
            var labels = query.Select(q => q.CompanyName ?? "Unknown").ToList();

            return (data, labels);
        }
        public async Task<(List<int> Data, List<string> Labels)> GetBatchWisePlacementDataAsync()
        {
            var query = await _context.Studentplaceds
                .Include(sp => sp.Batch)
                .GroupBy(sp => sp.Batch!.Name)
                .Select(g => new
                {
                    BatchName = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            var data = query.Select(q => q.Count).ToList();
            var labels = query.Select(q => q.BatchName ?? "Unknown").ToList();

            return (data, labels);
        }
        public async Task<(List<int> Data, List<string> Labels)> GetUnplacedStudentsByBranchAsync()
        {
            var totalStudents = await _context.Tblstudents
                .Include(s => s.Studentacademics)
                .ThenInclude(sa => sa.Course)
                .GroupBy(s => s.Studentacademics.FirstOrDefault()!.Course!.Name)
                .Select(g => new
                {
                    BranchName = g.Key,
                    TotalCount = g.Count()
                })
                .ToListAsync();

            var placedStudents = await _context.Studentplaceds
                .Include(sp => sp.Student)
                .ThenInclude(s => s.Studentacademics)
                .ThenInclude(sa => sa.Course)
                .GroupBy(sp => sp.Student!.Studentacademics.FirstOrDefault()!.Course!.Name)
                .Select(g => new
                {
                    BranchName = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            var unplacedData = totalStudents.Select(ts => new
            {
                BranchName = ts.BranchName,
                UnplacedCount = ts.TotalCount - (placedStudents.FirstOrDefault(ps => ps.BranchName == ts.BranchName)?.Count ?? 0)
            }).ToList();

            var data = unplacedData.Select(q => q.UnplacedCount).ToList();
            var labels = unplacedData.Select(q => q.BranchName ?? "Unknown").ToList();

            return (data, labels);
        }
        public async Task<(List<int> Data, List<string> Labels)> GetPlacementStatusSummaryAsync()
        {
            var totalStudents = await _context.Tblstudents.CountAsync();
            var placedStudents = await _context.Studentplaceds.CountAsync();
            var inProcessStudents = await _context.JobpostStudentrounds
                .Where(x => x.HasPassed == null || x.HasPassed == 1)
                .Select(x => x.StudentId)
                .Distinct()
                .CountAsync();

            var notPlacedStudents = totalStudents - placedStudents - inProcessStudents;

            var data = new List<int> { placedStudents, inProcessStudents, notPlacedStudents };
            var labels = new List<string> { "Placed", "In Process", "Not Placed" };

            return (data, labels);
        }
    }
}
