using System;
using System.Collections.Generic;

namespace Placements.WebApi.Placement.Models;

public partial class Template
{
    public long Id { get; set; }

    public int? CategoryId { get; set; }

    public string? Name { get; set; }

    public string? Subject { get; set; }

    public string? Body { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual TemplateCategory? Category { get; set; }

    public virtual ICollection<TemplatePlaceholder> TemplatePlaceholders { get; set; } = new List<TemplatePlaceholder>();
}
