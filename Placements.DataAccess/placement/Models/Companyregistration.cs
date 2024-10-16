using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Companyregistration
{
    public long Id { get; set; }

    public string? CompanyName { get; set; }

    public string? Email { get; set; }

    public string? ContactPerson { get; set; }

    public string? Location { get; set; }

    public string? PhoneNumber { get; set; }

    public ulong IsActive { get; set; }

    public ulong IsDeleted { get; set; }

    public int? UserType { get; set; }

    public string? Password { get; set; }

    public DateTime? DateOfRegistration { get; set; }
}
