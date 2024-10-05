using System;
using System.Collections.Generic;

namespace Placements.DataAccess.placement.Models;

public partial class Studentacademic
{
    public long Id { get; set; }

    public long? StudentId { get; set; }

    public long? CourseId { get; set; }

    public long? StreamId { get; set; }

    public decimal? Cgpa { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
