using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Traningfeedbackque
{
    public long Id { get; set; }

    public string? Question { get; set; }

    public long? ScheduleId { get; set; }

    public DateTime? CreatedDate { get; set; }

    public long? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public long? ModifiedBy { get; set; }

    public bool? IsDeleted { get; set; }

    public virtual Trainerschedule? Schedule { get; set; }

    public virtual ICollection<Trainingfeedbackre> Trainingfeedbackres { get; set; } = new List<Trainingfeedbackre>();
}
