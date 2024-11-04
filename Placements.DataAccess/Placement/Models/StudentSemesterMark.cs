using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class StudentSemesterMark
{
    public long Id { get; set; }

    public long? StudentAcademicId { get; set; }

    public int? Semester { get; set; }

    public decimal? Sgpa { get; set; }

    public string? Status { get; set; }

    public virtual Studentacademic? StudentAcademic { get; set; }
}
