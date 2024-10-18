﻿using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Studentregistartion
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? RollNumber { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public long? SchoolId { get; set; }

    public string? Batch { get; set; }

    public string? Branch { get; set; }

    public ulong IsDeleted { get; set; }

    public ulong IsActive { get; set; }

    public long? UserRoleId { get; set; }

    public string? Password { get; set; }

    public DateTime? DateOfRegistration { get; set; }
}
