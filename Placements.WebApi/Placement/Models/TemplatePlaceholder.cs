using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class TemplatePlaceholder
{
    public long Id { get; set; }

    public long? TemplateId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public virtual Template? Template { get; set; }
}
