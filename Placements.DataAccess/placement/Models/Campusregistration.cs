using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Campusregistration
{
    public long Id { get; set; }

    public string? CollegeName { get; set; }

    public string? CollegeEmail { get; set; }

    public string? Password { get; set; }

    public string? PlacementOfficerName { get; set; }

    public string? Email { get; set; }

    public long? ContactNumber { get; set; }

    public string? Address { get; set; }

    public string? State { get; set; }

    public string? Country { get; set; }

    public string? ZipCode { get; set; }

    public DateTime? DateOfRegistration { get; set; }

    public ulong IsDeleted { get; set; }

    public ulong IsActive { get; set; }

    public int? UserType { get; set; }

    public virtual ICollection<Collegejobposting> Collegejobpostings { get; set; } = new List<Collegejobposting>();

    public virtual ICollection<Collegejobpostingschedule> Collegejobpostingschedules { get; set; } = new List<Collegejobpostingschedule>();

    public virtual ICollection<Tblstudent> Tblstudents { get; set; } = new List<Tblstudent>();
}
