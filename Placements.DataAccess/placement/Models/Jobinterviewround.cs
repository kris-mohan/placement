﻿using System;
using System.Collections.Generic;

namespace Placements.DataAccess.placement.Models;

public partial class Jobinterviewround
{
    public long Id { get; set; }

    public long? JobPostingId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public int? Priority { get; set; }

    public virtual Jobposting? JobPosting { get; set; }

    public virtual ICollection<JobpostStudentround> JobpostStudentrounds { get; set; } = new List<JobpostStudentround>();
}