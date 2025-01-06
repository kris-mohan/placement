using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Notification
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? NotificationContent { get; set; }

    public string? ParentType { get; set; }

    public int? ParentId { get; set; }

    public sbyte? IsRead { get; set; }

    public long? CompanyId { get; set; }

    public int? CampusId { get; set; }

    public long? StudentId { get; set; }

    public virtual CampusCompany? Campus { get; set; }

    public virtual Companydatum? Company { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
