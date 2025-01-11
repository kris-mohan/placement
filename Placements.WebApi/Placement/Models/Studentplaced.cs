using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class Studentplaced
{
    public long Id { get; set; }

    public long? StudentId { get; set; }

    public long? OrgId { get; set; }

    public long? JobPostingId { get; set; }

    public long? BatchId { get; set; }

    public virtual Batch? Batch { get; set; }

    public virtual Jobposting? JobPosting { get; set; }

    public virtual Campusregistration? Org { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
