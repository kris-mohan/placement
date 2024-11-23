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

    public virtual ICollection<Chat> ChatReceivers { get; set; } = new List<Chat>();

    public virtual ICollection<Chat> ChatSenders { get; set; } = new List<Chat>();

    public virtual Companydatum? Company { get; set; }

    public virtual ICollection<Groupmember> Groupmembers { get; set; } = new List<Groupmember>();

    public virtual ICollection<Group> Groups { get; set; } = new List<Group>();

    public virtual ICollection<Message> MessageReceivers { get; set; } = new List<Message>();

    public virtual ICollection<Message> MessageSenders { get; set; } = new List<Message>();

    public virtual Userrole? Role { get; set; }

    public virtual Tblstudent? Student { get; set; }
}
