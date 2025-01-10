using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Trainingfeedbackre
{
    public long Id { get; set; }

    public long? TrainingId { get; set; }

    public long? StudentId { get; set; }

    public long? FeedBackQueId { get; set; }

    public string? Response { get; set; }

    public int? Rating { get; set; }

    public DateTime? CreatedDate { get; set; }

    public long? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public long? ModifiedBy { get; set; }

    public bool? IsDeleted { get; set; }

    public virtual Trainingfeedbackque? FeedBackQue { get; set; }

    public virtual Tblstudent? Student { get; set; }

    public virtual Trainerschedule? Training { get; set; }
}
