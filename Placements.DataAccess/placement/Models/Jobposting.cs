using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Jobposting
{
    public long Id { get; set; }

    public long? CompanyId { get; set; }

    public string? JobRole { get; set; }

    public string? JobDescription { get; set; }

    public DateTime? ValidFrom { get; set; }

    public DateTime? ValidTill { get; set; }

    public int? Positions { get; set; }

    public int? QuantityFilled { get; set; }

    public ulong? IsClosed { get; set; }

    public ulong IsDeleted { get; set; }

    public long? TechnologyId { get; set; }

    public decimal? Salary { get; set; }

    public string? Location { get; set; }

    public virtual ICollection<Collegejobposting> Collegejobpostings { get; set; } = new List<Collegejobposting>();

    public virtual ICollection<Collegejobpostingschedule> Collegejobpostingschedules { get; set; } = new List<Collegejobpostingschedule>();

    public virtual Companydatum? Company { get; set; }

    public virtual ICollection<Jobinterviewpanel> Jobinterviewpanels { get; set; } = new List<Jobinterviewpanel>();

    public virtual ICollection<Jobinterviewround> Jobinterviewrounds { get; set; } = new List<Jobinterviewround>();

    public virtual ICollection<JobpostingSelectedstudent> JobpostingSelectedstudents { get; set; } = new List<JobpostingSelectedstudent>();

    public virtual ICollection<JobpostingsEligiblestudent> JobpostingsEligiblestudents { get; set; } = new List<JobpostingsEligiblestudent>();

    public virtual Technology? Technology { get; set; }

    public virtual ICollection<Technology> Technologies { get; set; } = new List<Technology>();
}
