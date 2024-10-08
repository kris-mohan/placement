﻿using System;
using System.Collections.Generic;

namespace Placements.DataAccess.PaatashalaCompany.Models;

public partial class Login
{
    public long Id { get; set; }

    public long? CompanyId { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public DateTime? DateOfRegistration { get; set; }

    public string? EmployeeId { get; set; }

    public long? RoleId { get; set; }

    public bool Isdeleted { get; set; }

    public int? UserType { get; set; }

    public bool IsActive { get; set; }

    public virtual Companydatum? Company { get; set; }

    public virtual Role? Role { get; set; }
}
