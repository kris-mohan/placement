using System;
using System.Collections.Generic;

namespace Placements.DataAccess.placement.Models;

public partial class Jobpostingdetail
{
    public long Id { get; set; }

    public string? Streams { get; set; }

    public ulong IsDeleted { get; set; }
}
