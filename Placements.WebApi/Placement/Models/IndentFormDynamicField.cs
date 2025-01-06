using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class IndentFormDynamicField
{
    public long Id { get; set; }

    public long? IndentFormId { get; set; }

    public string? Name { get; set; }

    public string? Value { get; set; }

    public virtual IndentForm? IndentForm { get; set; }
}
