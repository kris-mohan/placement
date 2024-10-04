using System;
using System.Collections.Generic;

namespace Placements.DataAccess.placement.Models;

public partial class Tblstudent
{
    public long Id { get; set; }

    public long? OrgId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public int? BatchId { get; set; }

    public string? AadharCardNumber { get; set; }

    public string? PermanentAddress { get; set; }

    public string? CurrentAddress { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? ParentName { get; set; }

    public string? ParentPhoneNumber { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? RollNo { get; set; }

    public virtual ICollection<JobpostStudentround> JobpostStudentrounds { get; set; } = new List<JobpostStudentround>();

    public virtual ICollection<JobpostingSelectedstudent> JobpostingSelectedstudents { get; set; } = new List<JobpostingSelectedstudent>();

    public virtual ICollection<JobpostingsEligiblestudent> JobpostingsEligiblestudents { get; set; } = new List<JobpostingsEligiblestudent>();

    public virtual ICollection<Studentacademic> Studentacademics { get; set; } = new List<Studentacademic>();
}
