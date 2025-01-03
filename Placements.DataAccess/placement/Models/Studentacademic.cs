using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Studentacademic
{
    public long Id { get; set; }

    public long? StudentId { get; set; }

    public long? CourseId { get; set; }

    public long? StreamId { get; set; }

    public decimal? Cgpa { get; set; }

    public decimal? TenthMarks { get; set; }

    public decimal? TwelthMarks { get; set; }

    public string? TenthBoard { get; set; }

    public string? TwelthBoard { get; set; }

    public int? TenthPassedOutYear { get; set; }

    public int? TwelthPassedOutYear { get; set; }

    public string? TenthSchoolName { get; set; }

    public string? TwelthSchoolName { get; set; }

    public string? DiplomaCollegeName { get; set; }

    public long? TenthStatus { get; set; }

    public long? TwelfthStatus { get; set; }

    public long? CourseStatus { get; set; }

    public virtual Course? Course { get; set; }

    public virtual Stream? Stream { get; set; }

    public virtual Tblstudent? Student { get; set; }

    public virtual ICollection<StudentSemesterMark> StudentSemesterMarks { get; set; } = new List<StudentSemesterMark>();
}
