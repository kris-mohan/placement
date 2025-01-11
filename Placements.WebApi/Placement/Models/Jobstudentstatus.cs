using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class Jobstudentstatus
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<JobpostingsEligiblestudent> JobpostingsEligiblestudents { get; set; } = new List<JobpostingsEligiblestudent>();
}
