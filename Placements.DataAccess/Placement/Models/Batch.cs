using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Batch
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Tblstudent> Tblstudents { get; set; } = new List<Tblstudent>();
}
