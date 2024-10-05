using System;
using System.Collections.Generic;

namespace Placements.DataAccess.placement.Models;

public partial class Studentplaced
{
    public long Id { get; set; }

    public long? StudentId { get; set; }

    public long? OrgId { get; set; }

    public long? JobPostingId { get; set; }

    public long? BatchId { get; set; }
}
