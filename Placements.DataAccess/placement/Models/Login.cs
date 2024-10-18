using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Login
{
    public long Id { get; set; }

    public long? CompanyId { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public DateTime? DateOfRegistration { get; set; }

    public long? CampusId { get; set; }

    public long? RoleId { get; set; }

    public ulong IsDeleted { get; set; }

    public ulong IsActive { get; set; }

    public long? StudentId { get; set; }

    public virtual Campusregistration? Campus { get; set; }

    public virtual Companydatum? Company { get; set; }

    public virtual Userrole? Role { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
