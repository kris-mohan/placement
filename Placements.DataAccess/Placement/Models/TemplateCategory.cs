using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class TemplateCategory
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Template> Templates { get; set; } = new List<Template>();
}
