using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class IndentForm
{
    public long Id { get; set; }

    public string? CompanyName { get; set; }

    public string? ContactPersonName { get; set; }

    public string? ContactPersonDesignation { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<IndentFormDynamicField> IndentFormDynamicFields { get; set; } = new List<IndentFormDynamicField>();
}
