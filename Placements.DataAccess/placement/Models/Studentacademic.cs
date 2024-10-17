namespace Placements.DataAccess.Placement.Models;

public partial class Studentacademic
{
    public long Id { get; set; }

    public long? StudentId { get; set; }

    public long? CourseId { get; set; }

    public long? StreamId { get; set; }

    public decimal? Cgpa { get; set; }

    public virtual Course? Course { get; set; }

    public virtual Stream? Stream { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
