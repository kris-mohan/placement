using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class CompanyJobCourse
{
    public long Id { get; set; }

    public long? JobPostingId { get; set; }

    public long? CourseId { get; set; }

    public virtual Course? Course { get; set; }

    public virtual Jobposting? JobPosting { get; set; }
}
