using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Jobstudentstatus
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<JobpostingsEligiblestudent> JobpostingsEligiblestudents { get; set; } = new List<JobpostingsEligiblestudent>();
}
