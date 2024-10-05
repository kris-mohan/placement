using System;
using System.Collections.Generic;

namespace Placements.DataAccess.placement.Models;

public partial class Trainerschedule
{
    public long Id { get; set; }

    public long? CompanyId { get; set; }

    public long? SchoolId { get; set; }

    public long? CourseId { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public long? TrainerId { get; set; }

    public string? ScheduleType { get; set; }

    public long? StudentId { get; set; }

    public ulong IsDeleted { get; set; }

    public virtual Trainingcourse? Course { get; set; }

    public virtual Trainer? Trainer { get; set; }
}
