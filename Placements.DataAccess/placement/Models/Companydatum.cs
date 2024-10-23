using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Companydatum
{
    public long Id { get; set; }

    public string? Url { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Gstnumber { get; set; }

    public string? ContactPerson { get; set; }

    public string? AddressLine1 { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? ZipCode { get; set; }

    public string? Country { get; set; }

    public long? ParentCompanyId { get; set; }

    public ulong IsDeleted { get; set; }

    public ulong IsActive { get; set; }

    public DateTime? DateOfRegistration { get; set; }

    public int UserRoleId { get; set; }

    public string? Password { get; set; }

    public string? Email { get; set; }

    public long? CompanySize { get; set; }

    public string? LogoPath { get; set; }

    public string? About { get; set; }

    public string? HeadQuarters { get; set; }

    public string? VideoPath { get; set; }

    public string? PresentationPath { get; set; }

    public string? DocumentPath { get; set; }

    public string? AudioPath { get; set; }

    public virtual ICollection<Companydesignation> Companydesignations { get; set; } = new List<Companydesignation>();

    public virtual ICollection<Companyindustry> Companyindustries { get; set; } = new List<Companyindustry>();

    public virtual ICollection<Companytechonology> Companytechonologies { get; set; } = new List<Companytechonology>();

    public virtual ICollection<Jobposting> Jobpostings { get; set; } = new List<Jobposting>();

    public virtual ICollection<Login> Logins { get; set; } = new List<Login>();

    public virtual ICollection<Paatashalaregistration> Paatashalaregistrations { get; set; } = new List<Paatashalaregistration>();
}
