using System;
using System.Collections.Generic;

namespace Placements.DataAccess.Placement.Models;

public partial class Document
{
    public long Id { get; set; }

    public string? FileName { get; set; }

    public string? FilePath { get; set; }

    public string? FileType { get; set; }

    public string? ParentType { get; set; }

    public long? ParentId { get; set; }

    public bool? IsDeleted { get; set; }

    public DateTime? CreatedDate { get; set; }

    public bool? CreatedBy { get; set; }
}
