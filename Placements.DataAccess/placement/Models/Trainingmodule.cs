using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Trainingmodule
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public long? TrainingCourseId { get; set; }

    public string? TrainingMode { get; set; }

    public string? TrainingAssetFolder { get; set; }

    public ulong IsDeleted { get; set; }

    public virtual Trainingcourse? TrainingCourse { get; set; }
}
