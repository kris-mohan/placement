using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Collegejobpostingschedule
{
    public long Id { get; set; }

    public long? CollegeId { get; set; }

    public long? JobPostingId { get; set; }

    public DateTime? ScheduledDate { get; set; }

    public virtual Campusregistration? College { get; set; }

    public virtual Jobposting? JobPosting { get; set; }
}
