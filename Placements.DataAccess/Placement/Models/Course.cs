using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Course
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? FullForm { get; set; }

    public virtual ICollection<CompanyJobCourse> CompanyJobCourses { get; set; } = new List<CompanyJobCourse>();

    public virtual ICollection<Studentacademic> Studentacademics { get; set; } = new List<Studentacademic>();
}
